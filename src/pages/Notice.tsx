import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { database } from '@/firebaseConfig';
import { ref as databaseRef, onValue } from 'firebase/database';
import Sidebar from '@/components/sidebar';
import PopupImage from '@/components/Util/popupImage';

type Notice = {
    id: string;
    Writer: string;
    Date: string;
    isHot: boolean;
    isNew: boolean;
    Title: string;
    ViewCount: number;
    Category: number;
};

type User = {
    nickname: string;
    adminLevel: number;
};

const Notice = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [searchCategory, setSearchCategory] = useState('title');
    const [keyword, setKeyword] = useState('');
    const [notices, setNotices] = useState<Notice[]>([]);
    const [users, setUsers] = useState<{ [key: string]: User }>({});
    const [isSelected, setIsSelected] = useState(false);
    const [category, setCategory] = useState('1');

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/base.min.css';
        document.head.appendChild(link);

        const noticeRef = databaseRef(database, 'board');
        const userRef = databaseRef(database, 'users');

        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            setUsers(userData);
        });

        onValue(noticeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const Notices: Notice[] = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));
                setNotices(Notices);
            }
        });
    }, []);

    console.log(category)

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const getUserAdminLevel = (writer: string): number => {
        for (let userId in users) {
            if (users[userId].nickname === writer) {
                return users[userId].adminLevel;
            }
        }
        return 0; // Default to 0 if no match found
    };

    const getImageSrc = (adminLevel: number): string => {
        if (adminLevel === 3) {
            return '/admin/crown3.png';
        } else if (adminLevel === 2) {
            return '/admin/crown2.png';
        } else if (adminLevel === 1) {
            return '/admin/crown1.png';
        }
        return ''; // Default image if no adminLevel matches
    };

    const toggleSelect = () => {
        setIsSelected(!isSelected);
    };

    const searchCategoryChange = (searchCategory: string) => {
        setSearchCategory(searchCategory);
        setIsSelected(false);
    };

    const getSearchCategory = (searchCategory: string) => {
        switch (searchCategory) {
            case 'title':
                return '제목';
            case 'contents':
                return '내용';
            case 'titlecontents':
                return '제목+내용';
            default:
                return '제목';
        }
    };

    // Function to set category and update tab class names
    const categoryChange = (category: string) => {
        setCategory(category);
    };

    return (
        <div>
            <Head>
                <title>공지사항</title>
            </Head>

            {!isSidebarOpen && (
                <button
                    className="fixed top-0 left-0 p-4 z-50"
                    aria-label="Toggle menu"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <div className="space-y-2">
                        <span className="block w-10 h-1 bg-black"></span>
                        <span className="block w-10 h-1 bg-black"></span>
                        <span className="block w-10 h-1 bg-black"></span>
                    </div>
                </button>
            )}
            {isSidebarOpen && (
                <Sidebar
                    isOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    showPopup={showPopup}
                />
            )}
            <div className="flex flex-col flex-1 items-center justify-center">
                <PopupImage isVisible={isPopupVisible} onClose={handlePopupClose} />
            </div>

            <div className="ch-happyoz chrome chrome125">
                <div id="wrap">
                    <div className="default" id="layout">
                        <section id="content">
                            <div className="content-wrap">
                                <div className="content-body">
                                    <div id="board" className="mt-36">
                                        <div className="sub-title">
                                            <h1 className="title">공지사항</h1>
                                            <section className="board-tab type1">
                                                <nav className="tab">
                                                    <ul>
                                                        <li>
                                                            <a className={category === '1' ? "on" : "off"} href="#" onClick={() => categoryChange('1')}>공지</a>
                                                        </li>
                                                        <li>
                                                            <a className={category === '2' ? "on" : "off"} href="#" onClick={() => categoryChange('2')}>일정</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </section>
                                            <section className="board-search">
                                                <form name="frm_search">
                                                    <input type="hidden" name="category" value="1" />
                                                    <div className="js-select">
                                                        <span className={`selected ${isSelected ? 'expend' : ''}`} onClick={toggleSelect}>
                                                            {getSearchCategory(searchCategory)}
                                                        </span>
                                                        <ul className={`select-list ${isSelected ? 'expend' : ''}`}>
                                                            <li>
                                                                <button type="button" className={searchCategory === 'title' ? 'on' : ''} onClick={() => searchCategoryChange('title')}>제목</button>
                                                            </li>
                                                            <li>
                                                                <button type="button" className={searchCategory === 'contents' ? 'on' : ''} onClick={() => searchCategoryChange('contents')}>내용</button>
                                                            </li>
                                                            <li>
                                                                <button type="button" className={searchCategory === 'titlecontents' ? 'on' : ''} onClick={() => searchCategoryChange('titlecontents')}>제목+내용</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <select name="search" style={{ display: 'none' }} value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                                                        <option value="title">제목</option>
                                                        <option value="contents">내용</option>
                                                        <option value="titlecontents">제목+내용</option>
                                                    </select>
                                                    <input className="text" type="text" placeholder="검색" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                                                    <input className="search" pattern="[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9|\s]*$" placeholder="검색어를 입력해 주세요." type="submit" value="검색" />
                                                </form>
                                            </section>
                                        </div>

                                        <div className="board-list">
                                            <table className="type1">
                                                <colgroup>
                                                    <col className="category" />
                                                    <col className="subject" />
                                                    <col className="writer" />
                                                    <col className="write-date" />
                                                    <col className="read-count" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th className="category">분류</th>
                                                        <th className="subject">제목</th>
                                                        <th className="writer">작성</th>
                                                        <th className="write-date">날짜</th>
                                                        <th className="read-count">조회</th>
                                                        <th className="like-count">추천</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {notices
                                                        .filter(notice => notice.Category.toString() === category) // Filter notices by selected category
                                                        .map((notice) => {
                                                            const adminLevel = getUserAdminLevel(notice.Writer);
                                                            const imageSrc = getImageSrc(adminLevel);
                                                            return (
                                                                <tr key={notice.id}>
                                                                    <td className="category">
                                                                        <span className={notice.Category === 1 ? 'pink' : 'purple'}>
                                                                            {notice.Category === 1 ? '공지' : '일정'}
                                                                        </span>
                                                                    </td>
                                                                    <td className="subject">
                                                                        <span className="subject">
                                                                            <a href={`/Notice/${notice.id}`}>{notice.Title}</a>
                                                                            {notice.isHot && <em className="hot" title="Hot">Hot</em>}
                                                                            {notice.isNew && <em className="new" title="New">New</em>}
                                                                        </span>
                                                                    </td>
                                                                    <td className="writer">
                                                                        {notice.Writer === '라테일' ? (
                                                                            <div className="user-character admin">
                                                                                <div className="image">라테일</div>
                                                                                <div className="name">라테일</div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="user-character relative">
                                                                                {adminLevel > 0 && (
                                                                                    <Image
                                                                                        alt="admin"
                                                                                        width="30"
                                                                                        height="30"
                                                                                        className="inline-block bg-no-repeat bg-[0px] bg-origin-padding bg-clip-border border-collapse box-border text-transparent leading-[0px] transition-all"
                                                                                        src={imageSrc}
                                                                                    />
                                                                                )}
                                                                                <div className="name">
                                                                                    {notice.Writer}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                    <td className="write-date">
                                                                        <time>{notice.Date}</time>
                                                                    </td>
                                                                    <td className="read-count">
                                                                        <span>{notice.ViewCount}</span>
                                                                    </td>
                                                                </tr>

                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="board-list-menu">
                                            <div className="align-right"></div>
                                            <div className="paging">
                                                <div className="page">
                                                    <a className="on" href="">1</a>
                                                </div>
                                                {/*<a className="next" href="https://www.latale.com/news/notice?category=1&amp;page=11&amp;next=2783">다음</a>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notice;
