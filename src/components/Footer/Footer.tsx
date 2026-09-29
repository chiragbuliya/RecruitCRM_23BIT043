import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-600 text-sm mt-auto">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-200">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-neutral-900">Support</h4>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">AirCover</a>
            <a href="#" className="hover:underline">Anti-discrimination</a>
            <a href="#" className="hover:underline">Disability support</a>
            <a href="#" className="hover:underline">Cancellation options</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-neutral-900">Hosting</h4>
            <a href="#" className="hover:underline">Airbnb your home</a>
            <a href="#" className="hover:underline">AirCover for Hosts</a>
            <a href="#" className="hover:underline">Hosting resources</a>
            <a href="#" className="hover:underline">Community forum</a>
            <a href="#" className="hover:underline">Hosting responsibly</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-neutral-900">Airbnb</h4>
            <a href="#" className="hover:underline">Newsroom</a>
            <a href="#" className="hover:underline">New features</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Investors</a>
            <a href="#" className="hover:underline">Gift cards</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-neutral-900">Community</h4>
            <a href="#" className="hover:underline">Airbnb.org disaster relief</a>
            <a href="#" className="hover:underline">Combating discrimination</a>
            <a href="#" className="hover:underline">Student discount</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-neutral-800">
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Globe size={16} />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline">
              <span>$</span>
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
