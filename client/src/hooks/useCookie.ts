import Cookies from 'universal-cookie';
const cookies = new Cookies();

interface IOptions {
  maxAge: number;
}

const useCookie = () => {
  const setValue = (name: string, value: string, options: IOptions) =>
    cookies.set(name, value, { ...options });

  const getValue = (key: string) => cookies.get(key);

  const removeValue = (key: string) => cookies.remove(key, { path: '/' });

  return {
    setValue,
    getValue,
    removeValue
  };
};

export default useCookie;
