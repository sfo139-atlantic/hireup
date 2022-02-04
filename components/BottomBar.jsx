import Link from 'next/link';


const BottomBar = () => {

  return(
    <footer>
      <div className="bottom-0 left-0 right-0 bg-black">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-end h-16">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href='aboutus'>
              <a className='text-white hover:text-green px-4 py-1 rounded-md text-sm font-semibold font-sans'>About Us</a>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default BottomBar;