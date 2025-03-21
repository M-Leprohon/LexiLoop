import { login, signup, anonymousLogin } from 'actions/auth';
import { Button } from '@nextui-org/react';

export default function LoginPage() {
  return (
    <div className="md:flex md:grid-cols-3 items-center">
      <form>
        <label htmlFor="email" className="block text-sm font-medium leading-6">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <Button className="mr-2 mt-2" type="submit" formAction={login}>
          Log in
        </Button>
        <Button type="submit" formAction={signup}>
          Sign up
        </Button>
      </form>
      <div className="ml-10 mr-10 max-md:mt-5 max-md:mb-5">or</div>
      <form>
        <Button type="submit" formAction={anonymousLogin}>
          Try as Anonymous
        </Button>
      </form>
    </div>
  );
}
