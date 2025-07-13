'use client';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <WifiOff className="h-12 w-12 text-[#2196F3]" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800">You're Offline</h1>
        
        <p className="text-gray-600">
          It seems you've lost your internet connection. Please check your network settings and try again.
        </p>

        <div className="flex flex-col space-y-3">
          <Button 
            onClick={() => window.location.reload()}
            className="w-full bg-[#0a2342] hover:bg-blue-700"
          >
            Retry Connection
          </Button>
          
          <Button 
            variant="outline"
            className="w-full text-gray-600 border-gray-300"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}