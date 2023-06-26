import { getProviders, signIn } from 'next-auth/react';
import { getGradient } from '../lib/time';

function Login({ providers }) {

  return (
    <div className={`flex flex-col ${getGradient()} items-center min-h-screen w-full justify-center`}>
      <h1 className='text-white lg:text-7xl sm: text-4xl font-bold mb-10'>spotify-next</h1>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>

          <button className="bg-[#18D860] text-white p-5 rounded-full"
          onClick={() => signIn(provider.id, {callbackUrl: "/"})}
          >
            
            Login with {provider.name}</button>
        </div>
      ))}

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