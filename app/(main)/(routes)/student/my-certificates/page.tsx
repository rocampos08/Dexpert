import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Asegúrate de que esta ruta sea correcta para tu instancia de Prisma

export default async function CertificatesPage() {
  const user = await currentUser();
  if (!user) {
    // Si no hay un usuario autenticado por Clerk, pídele que inicie sesión.
    return <p>Debes iniciar sesión para ver tus certificados.</p>;
  }

  // Paso 1: Primero, busca el UserProfile usando el ID de usuario de Clerk.
  // Este es el puente entre el usuario autenticado por Clerk y tu base de datos.
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  if (!userProfile) {
    // Si no se encuentra un UserProfile para el usuario de Clerk,
    // significa que el usuario aún no tiene un perfil en tu sistema.
    // Podrías redirigirlo para crear uno o mostrar un mensaje apropiado.
    return <p>Tu perfil de usuario no se ha encontrado. Por favor, asegúrate de haber completado tu registro.</p>;
  }

  // Paso 2: Con el ID del UserProfile, busca el perfil de Student.
  // Según tu esquema, Student.userId se relaciona con UserProfile.id.
  const student = await prisma.student.findUnique({
    where: { userId: userProfile.id }, // ¡Aquí está el cambio clave! Usamos userProfile.id
  });

  if (!student) {
    // Si no se encuentra el perfil de Student, y ya tenemos un UserProfile,
    // puede indicar que el UserProfile existe pero no está vinculado a un Student.
    // Esto podría suceder si el usuario no completó el flujo de registro de estudiante.
    return <p>No se encontró tu perfil de estudiante. Por favor, completa la información de tu perfil.</p>;
  }

  // Paso 3: Una vez que tenemos el perfil de estudiante, busca sus aplicaciones aprobadas.
  const applications = await prisma.application.findMany({
    where: { studentId: student.id, status: "approved" },
    include: {
      certificate: true, // Incluye la información del certificado si existe
      project: true,     // Incluye la información del proyecto
    },
  });

  if (!applications.length) {
    // Si no hay aplicaciones aprobadas, muestra un mensaje amigable.
    return <p>Aún no tienes certificados disponibles.</p>;
  }

  // Paso 4: Renderiza la lista de certificados.
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mis Certificados</h1>
      <ul className="space-y-4">
        {applications.map((app) => (
          <li key={app.id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">{app.project.title}</h2>
            {app.certificate?.url ? (
              <a
                href={app.certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 flex items-center gap-1"
              >
                Descargar Certificado
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>
            ) : (
              <p className="text-gray-500 text-sm">Certificado aún no disponible.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}