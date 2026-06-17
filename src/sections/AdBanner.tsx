interface AdBannerProps {
  size?: string;
}

export default function AdBanner({ size = '320x50' }: AdBannerProps) {
  return (
    <div className="w-full bg-[#161A22] border border-dashed border-[#2A3142] rounded-xl flex items-center justify-center py-4">
      <span className="text-[#64748B] text-xs font-medium">Ad Banner · {size}</span>
    </div>
  );
}
