import { login } from './actions';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>로그인</button>
      <a href="/signup">
        <button type="button">회원가입으로</button>
      </a>
    </form>
  );
}
