import { signup } from './actions';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="nickname">Nickname:</label>
      <input id="nickname" name="nickname" type="text" required />
      <a href="/login">
        <button type="button">로그인으로</button>
      </a>
      <button formAction={signup}>회원가입</button>
    </form>
  );
}
