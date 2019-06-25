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

/**
 *获取单只股票利润表
 */
const income = async (stockCode) => {
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
const search = (code)=>{
	return http.get(`https://xueqiu.com/stock/search.json?code=${code}&size=50&page=1`,{},{
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
	search,//搜索股票
}
