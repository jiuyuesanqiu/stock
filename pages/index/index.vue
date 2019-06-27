<template>
	<view class="page">
		<view style="position: fixed;font-size: 28upx;background: #fff;color: #999;width: 100%;">
			<view class="cu-bar search bg-white" @tap="search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input placeholder="请输入股票名称或代码" disabled></input>
				</view>
			</view>
			<view class="pl-2 pr-2 border-bottom1" style="height: 72upx;line-height: 72upx;">
				<view class="pl-5" style="width: 33.33%;display: inline-block;">股票名称</view>
				<view class="pr-1" style="width: 33.33%;display: inline-block;text-align: right;">当前价格</view>
				<view class="pl-3" style="width: 33.33%;display: inline-block;text-align: center;">高/低估</view>
			</view>
		</view>

		<view class="" style="padding-top: 132upx;">
			<view @tap="detail(item.symbol)" class="whCenter ml-2 pr-2 border-bottom1" v-for="(item,index) in quoteList" :key="index" style="background: #fff;color: #333333;font-weight: bold;">
				<view class="wCenter hFlex pl-5" style="flex: 1;font-size: 30upx;align-items: flex-start;height: 100upx;line-height: 40upx;">
					<view class="hCenter" style="font-size: 34upx;color: #333333;">{{item.name}}</view>
					<view class="hCenter" style="font-size: 24upx;color: #a3a3a3;">{{item.symbol}}</view>
				</view>
				<view v-if="item.peg<1" class="hCenter pr-5" style="flex: 1;color: #E93030;font-size: 36upx;justify-content: flex-end;">{{item.current}}</view>
				<view v-else class="hCenter pr-5" style="flex: 1;color: #009900;font-size: 36upx;justify-content: flex-end;">{{item.current}}</view>
				<view class="whCenter" style="flex: 1;font-size: 36upx;">
					<view>{{item.assessment}}({{item.peg}})</view>
				</view>
			</view>
			<button @tap="previousPage">上一页</button>
			<button @tap="nextPage">下一页</button>
		</view>

		<view class="whCenter hFlex pt-5 pb-1" style="color: #ADAEAA;line-height: 44upx;background-color: #F8F8F8;font-size: 24upx;">
			<p>— 数据由A股估值分析团队整理提供 —</p>
			<p>估值数据仅供参考，不构成任何投资建议，投资需谨慎。</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titles: ['股票代码', '股票名称', '当前价格', 'PEG', '是否低估'],
				quoteList: [],
				pageSize: 1
			}
		},
		onLoad() {
			this.getData(this.pageSize);
		},
		methods: {
			detail(symbol){
				uni.navigateTo({
					url:`../detail/detail?symbol=${symbol}`
				})
			},
			/**
			 * 上一页
			 */
			previousPage() {

			},
			/**
			 * 下一页
			 */
			nextPage() {
				this.pageSize++;
				this.getData(this.pageSize);
			},
			search() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			async getData(pageSize) {
				let quoteList = await this.$api.quoteList(pageSize);
				let list = quoteList.list;
				let promiseQuotes = [];
				let promiseIncomes = [];
				for (let i = 0; i < list.length; i++) {
					let symbol = list[i].symbol;
					promiseQuotes.push(this.$api.quote(symbol));
					promiseIncomes.push(this.$api.income(symbol))
				}
				//并发20个请求
				let [quotes, incomes] = await Promise.all([Promise.all(promiseQuotes), Promise.all(promiseIncomes)]);

				for (let i = 0; i < list.length; i++) {
					//计算近4个季度扣除非经常性损益后的净利润和
					let pro_new = 0;
					let pro_old = 0;
					for (let j = 0; j < incomes[i].list.length; j++) {
						if (j > 3) {
							pro_old += incomes[i].list[j].net_profit_after_nrgal_atsolc[0];
						} else {
							pro_new += incomes[i].list[j].net_profit_after_nrgal_atsolc[0];
						}
					}
					//计算PE(avg)
					let pe_avg = (quotes[i].quote.pe_forecast + quotes[i].quote.pe_lyr + quotes[i].quote.pe_ttm) / 3;
					//计算i(pro)
					let i_pro = (pro_new - pro_old) / Math.abs(pro_old);
					//计算PEG
					let peg = 0;
					if (i_pro > 0) {
						peg = pe_avg / (i_pro * 100)
					} else {
						peg = pe_avg / (1 - i_pro)
					}
					if (peg > 1) {
						list[i].assessment = '高估';
					} else if (peg == 1) {
						list[i].assessment = '合理';
					} else {
						list[i].assessment = '低估';
					}
					list[i].peg = peg.toFixed(2);
				}
				this.quoteList = this.quoteList.concat(list);
			}
		}
	}
</script>

<style>
	.page {
		background-color: #FFF;
	}

	.border-bottom1 {
		border-bottom: 1upx solid #F3F3F3;
	}
</style>
