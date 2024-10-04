export default function Wrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div className="relative min-h-screen bg-[url('/book-bg.jpg')] bg-fixed p-5">
          <div className="absolute inset-0 bg-black opacity-50"></div> 
            {children}
        </div>
    )
}