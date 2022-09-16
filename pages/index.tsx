import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChunCheon from "../public//chuncheon.png";

interface User {
  id: number;
  name: string;
}

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.users);
  };

  const submitReg = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchUsers);
    alert("신청이 완료됐습니다.");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Head>
        <title>꽃보다 청춘, 콛보다 춘천</title>
        <meta name="description" content="Let's Go ChunCheon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-col w-screen items-center ">
        <div className="w-screen h-screen flex flex-col lg:flex-row items-center lg:justify-center rounded-full relative">
          <div className="lg:p-5">
            <Image src={ChunCheon} alt="썸네일" className="rounded-lg" />
          </div>
          <div className="flex flex-col justify-center lg:w-1/3 p-16 gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="font-bold text-xl">참여자 명단</div>
              <div className="flex flex-col items-center flex-wrap gap-1 ">
                {users?.map((user, idx) => (
                  <div key={user.id}>
                    {idx + 1}등 {user.name}
                  </div>
                ))}
              </div>
            </div>
            <input
              className="p-2 border border-yellow-900 rounded-sm"
              type="text"
              placeholder="이름을 입력해주세요."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              className="bg-yellow-500 text-white py-2 rounded-sm"
              onClick={submitReg}
            >
              신청하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
