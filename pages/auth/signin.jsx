import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Link from "next/link"

const logos = {
  GitHub: "/github.svg",
  Google: "/google.svg",
  Facebook: "/facebook.svg",
}

//Client
function signIn({ providers }) {
  return (
    <>
    <div className="p-10 h-screenNav flex flex-wrap justify-center items-center">
      <div className="w-3/6 xl:w-1/5 border border-gray-600 rounded">
          <div className="flex flex-wrap justify-center h-1/4 w-full">
            <div className="p-4">
            <Link href="/">
              <img
                  src={'/icon.svg'}
                  className="bg-black border-2 border-black rounded-full hover:cursor-pointer"
                  width="180"
                  height="180"
                  layout="intrinsic"
                  objectFit="contain"
                  alt=""
              />
              </Link>
            </div>
          </div>

          <form 
                method="post"
                action="/api/auth/callback/credentials"
                className="w-full p-4"
          >
            {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

            <label className="text-black font-semibold">
              Username:
              <input name="username" type="text" className="w-full mb-2 p-1 bg-transparent border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-transparent"/>
            </label>
           
            <label className="text-black font-semibold">
              Password:
              <input name="password" type="password" className="w-full mb-6 p-1 bg-transparent border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-transparent"/>
            </label>

            <button 
              type="submit"
              className="w-full border border-gray-600 bg-black text-base text-white p-2 rounded hover:border-green-600 hover:text-green-600 hover:scale-105 transform transition duration-200 ease-out"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center justify-center">
            <div className="ml-4 h-px flex-1 bg-green-600"></div>
            <p className="pl-2 pr-2">or</p>
            <div className="mr-4 h-px flex-1 bg-green-600"></div>
          </div>

          <div className="flex flex-wrap justify-center w-full p-4">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="w-full">
                <button 
                  className="mt-2 p-2 border border-gray-600 rounded w-full text-center hover:scale-105 transform transition duration-200 ease-out"
                  onClick={() => 
                    SignIntoProvider(provider.id, {callbackUrl: "/"})}
                  >
                  <img
                    className="h-5 w-5 inline-flex mr-2" 
                    src={logos[provider.name]} 
                    alt=""
                  />
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

//Server
export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }
  

export default signIn

//https://www.youtube.com/watch?v=a6Xs2Ir40OI 3.03.20
// https://next-auth.js.org/configuration/pages