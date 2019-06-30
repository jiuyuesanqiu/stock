import http from './interface'

//设置请求结束后拦截器
http.interceptor.response = (response) => {
	return response.data.data;
}


/**
 * 获取cookie
 */
let cookie = '';

uni.request({
	url: 'https://xueqiu.com',
	success: (result) => {
		cookie = result.header["Set-Cookie"];
	}
})

//等待函数
function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	});
}

const getCookie = async () => {
	while (true) {
		if (cookie != '') {
			return;
		} else {
			await timeout(50);
		}
	}
}


/**
 *获取单只股票利润表
 */
const income = async (stockCode) => {
	await getCookie();

	return http.request({
		url: '/v5/stock/finance/cn/income.json?type=S0&is_detail=true&count=8',
		method: 'GET',
		data: {
			symbol: stockCode
		},
		header: {
			'cookie': cookie
		},
	})
}

/**
 * 获取单只股票报价
 */
const quote = async (stockCode) => {
	await getCookie();

	return http.get('/v5/stock/quote.json?extend=detail', {
		symbol: stockCode
	}, {
		header: {
			'cookie': cookie
		}
	})
}

/**
 * 分页获取所有股票
 */
const quoteList = async (page = 1, size = 10, order = 'asc', orderby = 'code') => {
	await getCookie();
	return http.get('https://xueqiu.com/service/v5/stock/screener/quote/list?order_by=symbol&type=sh_sz', {
		page,
		size,
		order,
		orderby
	}, {
		header: {
			'cookie': cookie
		}
	})
}

/**
 * 搜索股票
 * 
 */
const search = async (code) => {
	await getCookie();

	return http.get(`https://xueqiu.com/stock/search.json?code=${code}&size=50&page=1`, {}, {
		header: {
			'cookie': cookie
		}
	})
}

/**
 * 获取K线图
 */
const keyline = async (stockCode) => {
	await getCookie();

	let begin = new Date().getTime() - 6 * 365 * 24 * 60 * 60 * 1000;
	let end = new Date().getTime();
	return http.get(
		`/v5/stock/chart/kline.json?symbol=${stockCode}&begin=${begin}&end=${end}&period=day&type=before&indicator=kline`, {}, {
			header: {
				'cookie': cookie
			}
		})
}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	income, //获取单只股票利润表
	quote, //获取单只股票报价
	quoteList, //获取股票列表
	search, //搜索股票
}
