import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { database } from '@/firebaseConfig';
import { ref as databaseRef, onValue } from 'firebase/database';

const Board: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState<number | null>(null);

    return (
        <div>
            <Head>
                <title>공지사항</title>
                <link rel="stylesheet" href="/base.min.css" />
            </Head>
            <div id="wrap">
                <div className="default" id="layout">
                    <section id="content">
                        <div id="sub-header">
                            <section id="sub-banner">
                                <div className="banner-wrap">
                                    <div className="banner">
                                        <div
                                            className="banner-bg"
                                            style={{ backgroundImage: 'url(//static.latale.com/latale/Contents/2024/05/2024052913082819112.jpg)' }}
                                        ></div>
                                        <a
                                            className="banner-image"
                                            href="https://www.latale.com/events/fun/2024/update-roadmap/"
                                            style={{ backgroundImage: 'url(//static.latale.com/latale/Contents/2024/05/2024052913082881349.png)' }}
                                            target="_blank"
                                        ></a>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="content-wrap" style={{ minHeight: '433.542px' }}>
                            <div className="content-body">
                                <div id="board">
                                    <div className="sub-title">
                                        <h1 className="title">공지사항</h1>
                                        <div className="board-view-menu">
                                            <div className="align-right">
                                                <a className="button white" href="">목록</a>
                                            </div>
                                        </div>
                                    </div>
                                    <article className="board-view type2">
                                        <div className="board-info">
                                            <input type="hidden" name="ViewToken" value="TOKEN_VALUE" />
                                            <div className="subject">
                                                <em className="category">
                                                    공지
                                                </em>
                                            </div>
                                            <div className="subject">
                                                <h1 className="subject">길드 작물 수확 관련 일정 안내</h1>
                                            </div>
                                            <div className="info-wrap">
                                                <div className="info">
                                                    <div className="write-date">
                                                        <time>2024.07.03 17:00 PM</time>
                                                    </div>
                                                    <div className="read-count">
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {id == '1' && (
                                            <div className="board-content">
                                                <p>
                                                    <Image
                                                        alt="admin"
                                                        width="1400"
                                                        height="300"
                                                        className="inline-block bg-no-repeat bg-[0px] bg-origin-padding bg-clip-border border-collapse box-border text-transparent leading-[0px] transition-all"
                                                        src={"../Notice.png"}
                                                    />
                                                    <br />
                                                    <br />
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>
                                                        안녕하세요. <span style={{ color: 'rgba(58, 50, 195, 1)', fontSize: '12pt', fontFamily: 'Noto Sans KR' }}><b>평등</b></span> 입니다.
                                                    </span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '13.3333px' }}><br /></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>길드 작물 수확과 관련하여 안내 드립니다.</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '13.3333px' }}><br /></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', color: 'rgba(0, 158, 37, 1)', fontFamily: 'Noto Sans KR' }}><b>◎ 평등 [보스] 작물 수확 기간 안내</b></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}> * 날짜 : 7월 4일(목)</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}> * 시간 : 20:00, 21:00, 22:00 중 진행</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '13.3333px' }}><br /></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>위 작물 수확은 [보스] 작물 수확이 진행됩니다.</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '13.3333px' }}><br /></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', color: 'rgba(0, 158, 37, 1)', fontFamily: 'Noto Sans KR' }}><b>◎ 평등 [온천] 작물 수확 기간 안내</b></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}> * 날짜 : 7월 5일(금), 7월 9일(화), 7월 11일 (목) </span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}> * 시간 : 20:00, 21:00, 22:00 중 진행</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '13.3333px' }}><br /></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>위 작물 수확은 [온천] 작물 수확이 진행됩니다.</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>
                                                        복귀 및 신규 여러분들의 성장 촉진을 위해 이번에는 길드원분들의 재화 부담 없이
                                                        <span style={{ fontWeight: 'bold', color: 'red' }}> 무료</span>(Host : Oryx)로 진행됩니다
                                                        <br /><br />
                                                    </span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>진행 방법은 다음과 같습니다.</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>1. 길드 작물 수확 시간에 길드룸에 대기해 주세요.</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>2. 길드룸에 나타난 몬스터를 처치하고, 길드룸 가운데에 나타난 포탈에 진입합니다.</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>2-1. 순번에 따라 진행조, 대기조가 편성됩니다. (희망 인원 수에 따라 나눌 예정, 2인 1조 예상)</span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>2-2. 진행조는 20분(버프 시간) 동안 작물 수확을 진행하고, 대기조는 다른 캐릭터로 대기합니다. </span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>2-3. 진행조가 끝났다고 알리면, 대기조는 버프를 받은 캐릭터로 입장하여 버프 시간 동안 작물 수확을 진행합니다. </span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '13.3333px' }}><br /></span>
                                                </p>
                                                <p>
                                                    <span style={{ fontSize: '12pt', fontFamily: 'Noto Sans KR' }}>감사합니다.<br /><br />&nbsp;</span>
                                                </p>
                                            </div>
                                        )}
                                        {id == '2' && (
                                            <div className="board-content">
                                                <p>찾을 수 없는 컨텐츠입니다.</p>
                                            </div>
                                        )}
                                        {id == '3' && (
                                            <div className="board-content">
                                                <p>찾을 수 없는 컨텐츠입니다.</p>
                                            </div>
                                        )}
                                        <div className="board-view-menu">
                                            <div className="align-left">
                                                <a className="button white" href="../Notice">목록</a>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Board;

