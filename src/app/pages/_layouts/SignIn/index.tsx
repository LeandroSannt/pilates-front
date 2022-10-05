import BackgroundLogin from '/assets/backgroundLogin.svg';
import Corona from '/assets/corona.svg';
import Logo from '/assets/logo.svg';

type Props = {
  children?: React.ReactNode;
};

import { Container } from './styles';
function Login({ children }: Props) {
  return (
    <Container>
      <div className="min-h-full flex">
        <div
          style={{ backgroundImage: `url(${BackgroundLogin})` }}
          className="
         bg-no-repeat
         bg-cover
         text-center 
         hidden 
         lg:block 
         relative 
         w-full
         flex-1
         bg-size
         "
        >
          <img
            className="absolute  inset-0 h-full w-9/12 object-cover  ml-32"
            src={`${Corona}`}
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-36 text-center w-auto mx-auto mb-16 "
                src={`${Logo}`}
                alt="Workflow"
              />
              <h2 className=" text-center mt-6 text-3xl font-extrabold text-gray900">
                Login
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  {children}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Login;
