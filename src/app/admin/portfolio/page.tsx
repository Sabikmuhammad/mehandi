import { Upload, Image as ImageIcon, Trash2, Eye } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest mb-1">Portfolio Management</h1>
          <p className="text-sm text-forest/60">Upload and manage images for your public gallery.</p>
        </div>
        
        <button className="px-5 py-2.5 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors shadow-sm rounded-sm flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Images
        </button>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm p-8 text-center border-dashed">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-16 h-16 bg-forest/5 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-forest/30" />
          </div>
          <h3 className="text-lg font-medium text-forest mb-2">Upload High-Quality Images</h3>
          <p className="text-sm text-forest/60 max-w-md mx-auto mb-6">
            Drag and drop images here, or click to browse. Supported formats: JPG, PNG, WEBP. Max size: 5MB per image.
          </p>
          <button className="px-6 py-3 border border-forest text-forest text-sm font-medium uppercase tracking-widest hover:bg-forest hover:text-ivory transition-colors">
            Browse Files
          </button>
        </div>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-forest/10 bg-ivory/30 flex justify-between items-center">
          <h2 className="text-sm font-medium text-forest">Live Gallery</h2>
          <select className="border border-forest/10 bg-white text-xs text-forest px-3 py-1.5 rounded outline-none focus:border-gold">
            <option>All Categories</option>
            <option>Bridal</option>
            <option>Engagement</option>
            <option>Guest/Party</option>
          </select>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12 text-forest/50 text-sm">
            <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
            No images in your portfolio yet.
          </div>
        </div>
      </div>
    </div>
  );
}
