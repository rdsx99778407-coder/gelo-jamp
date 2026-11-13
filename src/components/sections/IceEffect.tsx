export function IceEffect() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-[ice-shimmer_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-50/40 rounded-full mix-blend-multiply filter blur-3xl animate-[ice-shimmer_6s_ease-in-out_infinite_reverse]"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full mix-blend-multiply filter blur-[100px]"></div>
    </div>
  );
}