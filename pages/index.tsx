import axios from "axios";
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
  
  const dDay = new Date("2022-10-01 00:00:00 GMT+0900");
  const now = new Date();
  
  const diff = dDay.getTime() - now.getTime();
  
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const [day, setDay] = useState(d);
  const [hour, setHour] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [seconds, setSeconds] = useState(s);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data.users);
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

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);

      if (seconds === 0) {
        if (minutes === 0) {
          if (hour === 0) {
            if (day === 0) {
              clearTimeout(countdown);
            } else {
              setDay(day - 1);
              setHour(23);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setHour(hour - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [day, hour, minutes, seconds]);

  return (
    <>
      <Head>
        <title>꽃보다 청춘, 콛보다 춘천</title>
        <meta name="description" content="Let's Go ChunCheon" />
        <meta property="og:url" content="https://chun-cheon.vercel.app/"></meta>
        <meta property="og:title" content="꽃보다 청춘, 콛보다 춘천"></meta>
        <meta
          property="og:description"
          content="10월 1~2일 춘천 갈 사람 모집중"
        ></meta>
        <meta
          property="og:image"
          content="https://chun-cheon.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchuncheon.50ab303f.png&w=3840&q=75"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-col w-screen items-center ">
        <div className="w-screen h-screen flex flex-col xl:flex-row items-center lg:justify-center rounded-full relative">
          <div>
            <Image src={ChunCheon} alt="썸네일" className="rounded-lg" />
          </div>

          <div className="flex flex-col justify-center lg:w-2/5 p-8 gap-3">
            <div>
              <div className="flex justify-center text-lg gap-2 bg-black text-yellow-500 p-2 rounded-t-lg">
                춘천 출발까지
              </div>
              <div className="flex justify-center text-lg gap-2 bg-black text-yellow-500 p-3 rounded-b-lg">
                <p>
                  <em className="text-3xl">{String(day).padStart(2, "0")}</em>일
                </p>
                <p>
                  <em className="text-3xl">{String(hour).padStart(2, "0")}</em>
                  시
                </p>
                <p>
                  <em className="text-3xl">
                    {String(minutes).padStart(2, "0")}
                  </em>
                  분
                </p>
                <p>
                  <em className="text-3xl">
                    {String(seconds).padStart(2, "0")}
                  </em>
                  초
                </p>
              </div>
            </div>
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
