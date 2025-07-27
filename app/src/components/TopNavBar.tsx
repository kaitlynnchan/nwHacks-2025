import { Users } from "lucide-react";


export default function TopNavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200/50 bg-white/90 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          
          {/* Logo and App Name */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-400 to-yellow-400 p-2 rounded-xl shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Connect Quest
            </h1>
          </div>
          
        </div>
      </div>
    </header>
  );
}