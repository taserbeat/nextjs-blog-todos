import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'universal-cookie';
import { LockClosedIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { async } from 'regenerator-runtime';

const cookie = new Cookie();

export default function Auth({}) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const login = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/auth/jwt/create/`,
        {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.status === 400) {
            throw 'authentication failed';
          } else if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const options = { path: '/' };
          cookie.set('access_token', data.access, options);
        });

      router.push('/main-page');
    } catch (err) {
      alert(err);
    }
  };

  const register = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
        method: 'POST',
        body: JSON.stringify({ username: username, password, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status === 400) {
          throw 'authentication failed';
        }
      });
      login();
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (event) => {
    // デフォルトではブラウザがリロードしてしまうので、その挙動を無くす
    event.preventDefault();

    if (isLogin) {
      login();
    } else {
      register();
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <Image
          className="mx-auto h-12 w-auto"
          src="/workflow-mark-indigo-600.svg"
          alt="Workflow"
          width={48}
          height={48}
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Login' : 'Sign up'}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              className="font-medium text-white hover:text-indigo-500 cursor-pointer"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              change mode?
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            {isLogin ? 'Login with JWT' : 'Create new user'}
          </button>
        </div>
      </form>
    </div>
  );
}
