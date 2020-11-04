import React from 'react';
import styles from './index.module.css';
import { noop, uniq, randomPick } from '../../util/index';
import { WAYS, TYPES } from '../../constant/index';

const texts = [
    `生命，一次又一次轻薄过

轻狂不知疲倦

——题记`,
    '我听见回声，来自山谷和心间',
    '以寂寞的镰刀收割空旷的灵魂',
    '不断地重复决绝，又重复幸福',
    '终有绿洲摇曳在沙漠',
    '我相信自己',
    '生来如同璀璨的夏日之花',
    '不凋不败，妖冶如火',
    '承受心跳的负荷和呼吸的累赘',
    '乐此不疲',
    `I heard the echo, from the valleys and the heart

Open to the lonely soul of sickle harvesting

Repeat outrightly, but also repeat the well-being of

Eventually swaying in the desert oasis

I believe I am

Born as the bright summer flowers

Do not withered undefeated fiery demon rule

Heart rate and breathing to bear the load of the cumbersome

Bored`
];
const images = [
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3138065748,4073873552&fm=26&gp=0.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553186&di=14f0f7b4c2ec6c8209052d286d12a19c&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161222%2Fce3dcbe2adbe45dcbb52c296bf6da118_th.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553186&di=3c76f324aa21be2d5174e1a0182ab411&imgtype=0&src=http%3A%2F%2Fphoto.jdmama.com%2Fforum%2F201407%2F01%2F173718yqqfafyrqes6znsy.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553185&di=b0019f928a5a26756d4e23aaa84c6990&imgtype=0&src=http%3A%2F%2Fupload.iu178.com%2F10009%2Fimage%2F2017%2F03%2F15%2F1489543334164956.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553185&di=d3d537ea734c339bdae8780177823c63&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180108%2F431f3cc061064ca9af2f0272134ca79c.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553184&di=bb65de5a288b09483eef39caca0ee157&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190627%2Ff68f2edf51454e45a81f7d48f1249e92.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553184&di=16d5f85a01bf1ec565eb721f35bb2494&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1310%2F24%2Fc22%2F27913511_1382610828833.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553183&di=d5e5795c23ad816e7d7f37c10431116e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170929%2F32cb315855014a1e8db3e9ef1bcda281.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604492553183&di=195ac64ffd275556c6057eed646b87be&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160926%2Fc8f1e0ec279f43178033f80c0df9dad5_th.jpeg'
];
const systemTexts = [
    '系统错误',
    '1100 已经到达磁带的物理尽头',
    '1101 磁带访问到文件标记',
    '1102 到达磁带或分区首部',
    '1103 磁带访问到文件组的末尾',
    '1104 磁带上没有其他数据',
    '1105 磁带无法分区',
    '1106 访问多重卷分区的新磁带时，当前的区块大小不正确',
    '1107 加载磁带时，找不到磁带分区信息',
    '1108 无法锁定媒体退出功能',
    '1109 无法卸载媒体',
    '1110 驱动器中的媒体已经更改',
    '1111 已经复位I/O 总线',
    '1112 驱动器中没有媒体',
];
const avatarUrls = [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092361&di=5cd0c62199c1ba3b979aa9dc72dd11e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092360&di=58d23193daede2bb817aac3d37bfca26&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F16%2F20150916235818_HVAk2.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092360&di=ecc8f2469422fb02ea26a912c70e99a5&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F30%2F20140830180834_XuWYJ.png',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092360&di=5e63f1ad7a1d6385f5cfd7d3b4e74f9a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F11%2F20140911211243_3rT4u.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092359&di=6a9390190ce03d88d5560d37c72dbb40&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn19%2F0%2Fw400h400%2F20180910%2F3391-hiycyfw5413589.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493147602&di=c1287c5171d3e5d62c9f4b2466a3ea96&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F09%2F20180809143413_bcyoy.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092359&di=f4055e008ea97b8964e10721eba10685&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F15%2F20200615144625_WQAcx.thumb.400_0.jpeg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092358&di=7d764cf9d5dcf41d5bb8cfecb1bd0890&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F22%2F20200622133909_rftue.thumb.400_0.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092358&di=dd72344886077af6a7ac6679fdf56f19&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Da587b23df11f3a295a9dddcaac159007%2F500fd9f9d72a60590cfef2f92934349b023bba62.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092358&di=80e8ab2f304fb100b82b3d94b3e310fe&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201911%2F03%2F20191103115047_LXnKu.thumb.400_0.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092358&di=6f840ea18f137611e173b719c735abdf&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F10%2F20200410180317_ujnix.thumb.400_0.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092357&di=b327664d07ccc98dc4b6e8a3611dcaad&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F08%2F20200808142612_nsopf.thumb.400_0.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092357&di=ec72ec13f289581332c61d888f875270&imgtype=0&src=http%3A%2F%2Fww3.sinaimg.cn%2Fmw690%2F861756fcly1ge2vw0avchj20k00k046p.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493092357&di=bed9b1c759193d79d5449b516383983b&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F11%2F20200511141839_NUsHG.thumb.400_0.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604493210545&di=d727519b8c884263677cf464022588aa&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D192ab888f01f4134e0370576151e95c1%2F51da81cb39dbb6fded52c04d0424ab18972b374b.jpg'
];
const ways = Object.values(WAYS);

export default function MessageTool(props) {
    const { onMessage = noop } = props;
    return (
        <div className={styles.box}>
            <p>
                <button onClick={
                    () => onMessage(generateMessage(1))
                }>
                    随机生成一个文本消息
                </button>
            </p>
            <p>
                <button onClick={
                    () => onMessage(generateMessage(2))
                }>
                    随机生成一个图片消息
                </button>
            </p>
            <p>
                <button onClick={
                    () => onMessage(generateMessage(3))
                }>
                    随机生成一个系统消息
                </button>
            </p>
            <p>
                <button className={styles.primary} onClick={
                    () => onMessage(generateMessage(randomPick([1,2,3])))
                }>
                    随机生成一个随机类型消息
                </button>
            </p>
        </div>
    );
}

function generateMessage(type) {
    switch(type) {
        case 1: // text
            return {
                id: uniq(),
                type: TYPES.TYPE_TEXT,
                way: randomPick(ways),
                text: randomPick(texts),
                avatarUrl: randomPick(avatarUrls)
            };
        case 2: // image
            return {
                id: uniq(),
                type: TYPES.TYPE_IMAGE,
                way: randomPick(ways),
                imageUrl: randomPick(images),
                avatarUrl: randomPick(avatarUrls)
            };
        case 3: // system
            return {
                id: uniq(),
                type: TYPES.TYPE_SYSTEM,
                way: WAYS.WAY_RECEIVE,
                text: randomPick(systemTexts)
            };
        default:
            return {
                id: uniq(),
                type: TYPES.TYPE_SYSTEM,
                text: `<${type}> 不是支持的消息类型`
            };
    }
}

