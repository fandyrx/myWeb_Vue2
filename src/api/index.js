import { requests, requestM } from "./request";

import mockRequest from "./mockAjax";

export const reqUserInfo = () => mockRequest.get("/user");
//1.首页 获取句子切换
export const reqSentences = () => requests({ url: "/sentences", method: "get" });
// 获取首页卡片展示 图片
export const reqHomeImages = (params) => requests({ url: `/getImages/`, method: "get", params });

//query ?k=v 写法 params
//params  写法  data:params   使用data选项

//2.音乐接口 /banner

export const reqBanner = (type) => requestM({ url: "/banner", method: "get", params: { type } });

// 3.推荐分类 歌单
export const reqCommend = () =>
	requestM({
		url: "/personalized?limit=10",
	});

//playlist/hot  4.热门歌单
export const reqPlayTags = () =>
	requestM({
		url: "/playlist/highquality/tags",
	});

//  5.歌单详情
export const reqDetail = (id) => {
	return requestM({
		url: `/playlist/detail?id=${id}`,
		method: "get",
	});
};

//6.获取歌单所有歌曲 limit 展示数目

export const reqMusicItem = (id, limit) =>
	requestM({
		url: "/playlist/track/all",
		params: {
			id,
			limit,
		},
	});

//5.1详情页信息整理
export class SongDetails {
	constructor(playList) {
		this.name = playList.name; //歌单名
		this.coverImgUrl = playList.coverImgUrl;
		this.description = playList.description;
		this.creator = playList.creator.nickname;
		this.avatarUrl = playList.creator.avatarUrl; // 歌单作者头像
		this.tracks = playList.tracks; //专辑内容(含id)
	}
}
// tracks 里面 遍历
// this.alName =  playList.tracks.al.name   //专辑信息
// this.picUrl =  playList.tracks.al.picUrl
// this.singer = playList.tracks.ar.name

//6.获取歌曲URL
export const reqMusicUrl = (id) => {
	requestM({
		url: "/song/url/v1",
		params: {
			id,
			level: "exhigh",
		},
	});
};

//7.精品歌单 /top/playlist/highquality
export const reqTopPlayList = (cat) =>
	requestM({
		url: "/top/playlist/highquality",
		params: {
			cat,
		},
	});

//8. 新碟上架 /album/newest
export const reqTopAlbum = () =>
	requestM({
		url: "/album/newest",
	});

// 专辑内容
export const reqAlbumDetail = (id) =>
	requestM({
		url: "/album",
		params: {
			id,
		},
	});

export class AlbumDetail {
	constructor(album) {
		this.name = album.name; //歌单名
		this.coverImgUrl = album.picUrl;
		this.description = album.description;
		this.creator = album.artist.name;
		this.avatarUrl = album.artist.picUrl; // 歌单作者头像
		this.tracks = album.tracks; //专辑内容(含id)
	}
}
