import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';

const AboutUs = () => {

  const title='text-black text-2xl border-b border-grey p-1';
  const data ='text-grey m-4';

  return(
    <>
      <Navbar/>
      <div className="m-4 p-4 max-w-full h-screen">
        <div className="max-w-4xl h-full mx-auto px-2 sm:px-6 lg:px-8">
          <div>
            <h2 className={title}>
              Jesse Huang
            </h2>
            <p className={data}>
              Role: Project Manager
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
          <div>
            <h2 className={title}>
              Van Hsieh
            </h2>
            <p className={data}>
              Role: Project Manager
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
          <div>
            <h2 className={title}>
              Eric Lie
            </h2>
            <p className={data}>
              Role: Architecture Owner
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
          <div>
            <h2 className={title}>
              Jantira Vongampai
            </h2>
            <p className={data}>
              Role: Architecture Owner
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
          <div>
            <h2 className={title}>
              Chun Deng
            </h2>
            <p className={data}>
              Role: Architecture Owner
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
          <div>
            <h2 className={title}>
              Justin Le
            </h2>
            <p className={data}>
              Role: UI Owner
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
          <div>
            <h2 className={title}>
              Brian Dinh
            </h2>
            <p className={data}>
              Role: UI Owner
            </p>
            <p className={data}>
              Email:
            </p>
          </div>
        </div>
      </div>
      <BottomBar/>
    </>
  );
}

export default AboutUs;