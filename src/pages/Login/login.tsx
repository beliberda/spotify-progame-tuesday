import axios from "axios";

function LoginPage() {
  const register = async (email: string, name: string) => {
    const res = await axios.post("http://localhost:3001/api/auth/register", {
      email: email,
      name: name,
    });
    console.log(res);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    register(data.email as string, data.name as string);
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" />
        <input name="name" type="text" />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default LoginPage;
