import { getProviders, signIn } from 'next-auth/react';
import { getGradient } from '../lib/time';

function Login({ providers }) {

  return (
    <div className={`${getGradient()} flex min-h-screen w-full justify-center items-center align-middle`}>
      <div className='flex justify-center items-center align-middle '>

        <h1 className='text-white lg:text-7xl sm: text-4xl font-bold me-10'>spotify-next</h1>

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>

            <button className="bg-[#18D860] text-white p-5 rounded-full hover:scale-[1.1] focus:scale-[1.1] transition-all duration-200 ease-in-out shadow-md shadow-black/10"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >

              Login with {provider.name}</button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}