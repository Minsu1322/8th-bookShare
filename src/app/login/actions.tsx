'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { data: signInData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

// export async function signup(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//     nickname: formData.get('nickname') as string
//   };

//   const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   // (?=.*[A-Za-z]): 최소 하나의 영문자가 있어야 합니다.
//   // (?=.*\d): 최소 하나의 숫자가 있어야 합니다.
//   // (?=.*[@$!%*?&]): 최소 하나의 특수 문자가 있어야 합니다.
//   // [A-Za-z\d@$!%*?&]{8,}: 위의 조건을 만족하며, 길이가 최소 8자 이상이어야 합니다.

//   if (!passwordPattern.test(data.password)) {
//     console.error('비밀번호는 최소 8자 이상이어야 하며, 숫자와 특수 문자를 포함해야 합니다.');
//   } else {
//     console.log('비밀번호가 유효합니다.');
//   }

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     console.error('회원가입 오류:', error.message);
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }
