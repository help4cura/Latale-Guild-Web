import { useState, useEffect } from 'react';
import axios from 'axios';
import useServerTime from './useServerTime';

const statInfo: { [key: number]: string } = {
    26: '체력',
    30: '최대HP',
    70: '저항력',
    106: '이동속도 %',
    216: '방어력',
    455: '올스탯',
    464: '물리/마법 크리티컬 대미지 %',
    466: '물리/마법 명중률 %',
    497: '물리/마법 회피율 %',
    566: '일반 몬스터 추가 대미지',
    567: '일반 몬스터 추가 대미지 %',
    570: '보스 몬스터 추가 대미지',
    571: '보스 몬스터 추가 대미지 %',
    594: '근력/마법력',
};

const formatStat = (stat: string, value: number): string => {
    const stat_ = stat.replace('%', '').trim();
    return stat.includes('%') ? `${stat_} +${value}%` : `${stat_} +${value}`;
};

export function Item0() {

    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center w-56 border-2 border-item-outline rounded-lg bg-white p-2" style={{ zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-center text-item-blue">
                멀린의 토템 +50
            </div>
            <div className="text-center font-gulim text-12px text-gray-600 mb-4" style={{ lineHeight: '1.1em' }} >
                [전투장비]
            </div>
            <div className="font-gulim text-12px text-gray-600" style={{ lineHeight: '1.2em' }}>
                <div>필요 초월 레벨: Lv.4700</div>
                <div>제한 레벨 : 235 ▲</div>
                <div className="font-gulim text-12px text-item-blue">착용 가능 레벨 : 235 ▲</div>
            </div>
            <div className="font-gulim text-12px text-black" style={{ lineHeight: '1.2em' }}>
                <div className="font-gulim text-12px" style={{ textIndent: '0.5em' }}> 올스탯 +9100</div>
                <div className="font-gulim text-12px" style={{ textIndent: '0.5em' }}> 물리/마법 최소대미지 +107%</div>
                <div className="font-gulim text-12px" style={{ textIndent: '0.5em' }}> 물리/마법 최대대미지 +107%</div>
                <div className="font-gulim text-12px" style={{ textIndent: '0.5em' }}> 일반 몬스터 추가 대미지 +13300</div>
                <div className="font-gulim text-12px" style={{ textIndent: '0.5em' }}> 무기공격력/속성력 +48</div>
                <div className="font-gulim text-12px" style={{ textIndent: '0.5em' }}> 근력/마법력 +5200</div>
            </div>
            <div className="flex justify-between mt-6">
                <button className="font-gulim text-12px text-item-optOff px-2 ">거래</button>
                <button className="font-gulim text-12px text-item-optOn px-2 ">파괴</button>
                <button className="font-gulim text-12px text-item-optOn px-2 ">창고</button>
                <button className="font-gulim text-12px text-item-optOff px-2 ">판매</button>
            </div>
        </div>
    );
}

export function Item1() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-center">
                2024 로얄 상자 3
            </div>
            <div className="text-center font-gulim text-12px text-gray-600 mb-4">
                [이벤트]
            </div>
            <div className="font-gulim text-12px text-gray-600 mb-4">
                제한 레벨 : 1 ▲
            </div>
            <div className="font-gulim text-12px text-black" style={{ lineHeight: '1.1em' }}>
                <div className="font-gulim text-12px">&quot;다양한 상품으로 구성된 라테일 프리미엄 선물 상자&quot;</div>
                <br />
                <div className="font-gulim text-12px"> ※획득 가능 구성품※</div>
                <div className="font-gulim text-12px"> ☞ 블론드 머리모양 변경권</div>
                <div className="font-gulim text-12px"> ☞ 블론드 머리모양 <span className="text-item-red">영구</span> 변경권</div>
                <div className="font-gulim text-12px"> ☞ 스위트 블루 머리모양 변경권</div>
                <div className="font-gulim text-12px"> ☞ 스위트 블루 머리모양 <span className="text-item-red">영구</span> 변경권</div>
                <div className="font-gulim text-12px"> ☞ 스위트 머리모양 변경권</div>
                <div className="font-gulim text-12px"> ☞ 스위트 머리모양 <span className="text-item-red">영구</span> 변경권</div>
                <div className="font-gulim text-12px"> ☞ 라이트닝 윙 등록권</div>
                <div className="font-gulim text-12px"> ☞ 이젤 분양권[영구제]</div>
                <div className="font-gulim text-12px"> ☞ 얼굴장식 패션 선택권 I</div>
                <div className="font-gulim text-12px"> ☞ 기타 구성품은 홈페이지 하단&nbsp;[<br />확률보기]를 참고하세요.</div>
                <br />
                <div className="font-gulim text-12px"> ※효과※</div>
                <div className="font-gulim text-12px"> ☞ 개봉 시 소량의 경험치 증가</div>
                <div className="font-gulim text-12px"> ☞ 낮은 확률로 복주머니 추가 획득 <span style={{ marginLeft: '0.3em' }}>가능</span></div>
            </div>
            <div className="flex justify-between mt-1">
                <button className="font-gulim text-12px text-item-optOn px-2">거래</button>
                <button className="font-gulim text-12px text-item-optOn px-2">파괴</button>
                <button className="font-gulim text-12px text-item-optOn px-2">창고</button>
                <button className="font-gulim text-12px text-item-optOff px-2">판매</button>
            </div>
        </div>
    );
}

export function Item2() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-center text-item-end">
                개조된 드라이고플람의 시계
            </div>
            <div className="text-center font-gulim text-12px text-gray-600 mb-4" style={{ lineHeight: '1.2em' }}>
                [전투장비]
            </div>
            <div className="font-gulim text-12px text-gray-600" style={{ lineHeight: '1.25em' }}>
                필요 초월 레벨: Lv.5000 <br></br>
                제한 레벨 : 235 ▲
            </div>
            <div className="font-gulim text-12px text-item-blue" style={{ lineHeight: '1.25em' }}>
                착용 가능 레벨 : 235 ▲
            </div>
            <div className="font-gulim text-12px text-gray-600" style={{ lineHeight: '1.25em' }}>
                인챈트 등급: 5
            </div>
            <div className="font-gulim text-12px text-item-seal" style={{ lineHeight: '1.3em' }}>
                봉인중 (봉인가능횟수: 9회)
            </div>
            <div className="font-gulim text-12px text-item-decom mb-4" style={{ lineHeight: '1.1em' }}>
                분해가능
            </div>
            <div className="font-gulim text-12px text-item-enchant mb-8" style={{ lineHeight: '1.15em' }}>
                <div>물리/마법 최소 대미지 +100%</div>
                <div>물리/마법 최대 대미지 +100%</div>
                <div>물리/마법 크리티컬 대미지 +100%</div>
                <div>올스탯 +10000</div>
            </div>
            <div className="font-gulim text-12px" style={{ lineHeight: '1.2em' }}> ☞ 봉인이 가능한 개조된 드라이고플람의 시계</div>

            <div className="flex justify-between mt-1">
                <button className="font-gulim text-12px text-item-optOff px-2 ">거래</button>
                <button className="font-gulim text-12px text-item-optOn px-2 ">파괴</button>
                <button className="font-gulim text-12px text-item-optOn px-2 ">창고</button>
                <button className="font-gulim text-12px text-item-optOn px-2 ">판매</button>
            </div>
        </div>
    );
}

export function Giveaway_AccessKey01() {
    //const targetDate = new Date('2024-05-22T16:30:00+09:00');
    //const { message } = useServerTime(targetDate);

    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                Access Key
            </div>
            <div className="font-gulim text-12px text-gray-600">
                {/*{message}*/}
                Access Key : Good Luck!
            </div>
        </div>
    );
}

export function Skill_Awaken_1() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                【 스타시커 】
            </div>

            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[455], +2500)}
            </div>
            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[30], +25000)}
            </div>

            <div className="font-gulim text-12px text-black mb-2">
                ▲ 각성 스킬 ▲
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: "1.1em" }}>
                <div>&lt;레전드&gt;</div>
                <div>☞ 자신의 신체 능력을 대폭 강화하고, 레전드 스킬을 각성 시킵니다.</div>
            </div>
            <div className="font-gulim text-12px text-black">
                [ 1 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_2() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 2 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_3() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                명중 및 회피
            </div>

            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: '1.1em' }}>
                {formatStat(statInfo[466], 5)}
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: '1.1em' }}>
                {formatStat(statInfo[497], 3)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 3 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_4() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                이동속도
            </div>


            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[106], 10)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 4 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_5() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                이동속도
            </div>


            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[106], +10)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 5 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_6() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                명중 및 회피
            </div>

            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: '1.1em' }}>
                {formatStat(statInfo[466], 5)}
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: '1.1em' }}>
                {formatStat(statInfo[497], 3)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 6 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_7() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                다재다능
            </div>


            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[464], +4)}
            </div>
            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[466], +5)}
            </div>
            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[497], +3)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 7 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_8() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 8 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_9() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                방어 및 저항
            </div>

            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[216], +200)}
            </div>
            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[70], +200)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 9 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_10() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                최대 HP
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[30], +1000)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 10 슬롯 ]
            </div>
        </div>
    );
}
export function Skill_Awaken_11() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                최대 HP
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[30], +1000)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 11 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_12() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                방어 및 저항
            </div>

            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[216], +200)}
            </div>
            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[70], +200)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 12 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_13() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                철벽
            </div>

            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[30], +1000)}
            </div>
            <div className="font-gulim text-12px text-gray-600 " style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[216], +200)}
            </div>
            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[70], +200)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 13 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_14() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 14 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_15() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                일반 몬스터 대미지
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[566], +3000)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 15 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_16() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                보스 몬스터 대미지
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[570], +3000)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 16 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_17() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                일반 몬스터 대미지(%)
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[567], +1)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 17 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_18() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                보스 몬스터 대미지(%)
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[571], +1)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 18 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_19() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 19 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_20() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 20 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_21() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 21 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_22() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 22 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_23() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 23 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_24() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 24 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_25() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 25 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_26() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 26 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_27() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 27 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_28() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 28 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_29() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 29 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_30() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 30 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_31() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-2">
                올스탯
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2">
                {formatStat(statInfo[455], 250)}
            </div>

            <div className="font-gulim text-12px text-black">
                [ 31 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_32() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 32 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_33() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 33 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_34() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 34 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_35() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 35 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_36() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 36 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_37() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 37 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_38() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 38 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_39() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 39 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_40() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 40 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_41() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 41 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_42() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 42 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_43() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 43 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_44() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 44 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_45() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 45 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_46() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 46 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_47() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 47 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_48() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 48 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_49() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 49 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_50() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                체력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[26], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 50 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_51() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 51 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_52() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                근력 및 마법력
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[594], +500)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 52 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_53() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                이동속도
            </div>


            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[106], 10)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 53 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_54() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                이동속도
            </div>


            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[106], 10)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 54 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_55() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                이동속도
            </div>


            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[106], 10)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 55 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_57() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                크리티컬 대미지
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[464], +4)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 57 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_58() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                『 파괴자 』
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[464], +12)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 58 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_59() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                크리티컬 대미지
            </div>

            <div className="font-gulim text-12px text-gray-600 mb-2" style={{ lineHeight: "1.1em" }}>
                {formatStat(statInfo[464], +4)}
            </div>
            <div className="font-gulim text-12px text-black">
                [ 59 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_222() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                [ 인피니티 ]
            </div>
            <div className="font-gulim text-12px text-black mb-2">
                △ 강화 스킬 △
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: '1.1em' }}>
                <div>&lt;인피니티&gt; </div>
                <div>☞ 자신의 최대 HP의 150% 값을 쉴드로 생성함</div>
                <div>☞ 쉴드 지속 시간: 스킬 동작 중에만 적용됨</div>
                <div>☞ 타격 횟수 증가</div>
                <div>☞ 스킬 쿨타임이 15초로 변경됨</div>
            </div>
            <div className="font-gulim text-12px text-black">
                [ 222 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_251() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '208px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                레벨 업
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: '1.1em' }}>
                <div>&lt;크레이지 스로우&gt; 스킬 레벨 +1</div>
                <div>&lt;샤이닝 애로우&gt; 스킬 레벨 +1</div>
                <div>&lt;갤럭티카 매그넘&gt; 스킬 레벨 +1</div>
            </div>
            <div className="font-gulim text-12px text-black">
                [ 251 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_205() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: '290px', zoom: '67%' }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                【 펜오브나이프&애로우붐&이스케이프 샷 】
            </div>
            <div className="font-gulim text-12px text-black mb-2">
                ▲ 각성 스킬 ▲
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: '1.1em' }}>
                <div>&lt;펜 오브 나이프&gt;</div>
                <div>☞ 적들의 머리 위를 빠르게 지나가며 베기 공격을 가함</div>
                <div>☞ 2회 연속 사용 가능(연속 사용 가능 시간: 3초)</div>
                <div>☞ 단검 결계를 소환하여 적을 추가로 공격함</div>
                <div>☞ 타격 횟수 증가</div>
                <div>☞ 타겟수: 13</div>
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: '1.1em' }}>
                <div>&lt;애로우붐&gt;</div>
                <div>☞ 전방에 불의 화살을 발사하여 적을 관통함</div>
                <div>☞ 스킬 사용 시 이뮨 효과</div>
                <div>☞ 스킬 쿨타임이 12초로 감소됨</div>
                <div>☞ 타겟수: 13</div>
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: '1.1em' }}>
                <div>&lt;이스케이프샷&gt;</div>
                <div>☞ 광선포의 파동 범위가 대폭 증가함</div>
                <div>☞ 스킬 사용 시 강력한 비트를 소환함</div>
                <div>☞ 타겟수: 13</div>
            </div>
            <div className="font-gulim text-12px text-black">
                [ 205 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_237() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                [ 각성 I ]
            </div>

            <div className="font-gulim text-12px text-black mb-2">
                △ 강화 스킬 △
            </div>

            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: "1.1em" }}>
                <div>&lt;각성I&gt;</div>
                <div>☞ 모든 공격이 크리티컬 대미지로 적용됨</div>
                <div>☞ 타격 횟수 증가</div>
            </div>
            <div className="font-gulim text-12px text-black">
                [ 237 슬롯 ]
            </div>
        </div>
    );
}

export function Skill_Awaken_233() {
    return (
        <div className="shadow-itemShadow flex flex-col flex-1 justify-center border-2 border-item-outline rounded-lg bg-white p-2" style={{ width: "290px", zoom: "67%" }}>
            <div className="font-gulim text-12px font-bold text-gray-600 text-center mb-4">
                【 만천화우&애로우 트랩&바밍크라이 】
            </div>

            <div className="font-gulim text-12px text-black mb-2">
                ▲ 각성 스킬 ▲
            </div>

            <div className="font-gulim text-12px text-black mb-4" style={{ lineHeight: "1.1em" }}>
                <div>&lt;만천화우&gt;</div>
                <div>☞ 적의 공격을 회피함과 동시에 전방에 여러 개의 단검을 동시에 투척함</div>
                <div>☞ 피격 당한 적은 2초 간 속박</div>
                <div>☞ 2회 연속 사용 가능(연속 사용 가능 시간: 3초)</div>
                <div>☞ 스킬 사용 시 크레모아 소환</div>
                <div>☞ 타겟수: 13</div>
            </div>
            <div className="font-gulim text-12px text-black mb-4" style={{ lineHeight: "1.1em" }}>
                <div>&lt;애로우 트랩&gt;</div>
                <div>☞ 전방 지상에 화살비를 내리게함</div>
                <div>☞ 스킬 사용 중 적에게 받는 대미지 20% 감소</div>
                <div>☞ 피격 당한 적은 2초 간 속박됨</div>
                <div>☞ 타겟수: 12</div>
            </div>
            <div className="font-gulim text-12px text-black mb-2" style={{ lineHeight: "1.1em" }}>
                <div>&lt;바밍크라이&gt;</div>
                <div>☞ 전방에 폭격을 가하는 드론을 소환함</div>
                <div>☞ 타겟수: 12</div>
            </div>
            <div className="font-gulim text-12px text-black">
                [ 233 슬롯 ]
            </div>
        </div>
    );
}
