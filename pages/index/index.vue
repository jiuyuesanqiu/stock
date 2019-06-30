<template>
	<view>
		<view class="cu-bar search bg-white fixed" @tap="search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input placeholder="请输入股票名称或代码" disabled></input>
			</view>
		</view>
		<view class="px-5" style="padding-top: 110upx;">
			<view class="text-gray text-sm text-center">
				估值数据仅供参考，不构成任何投资建议，投资需谨慎
			</view>
			<view class="flex text-center py-2 bb">
				<view style="width: 25%;">
					股票名称
				</view>
				<view style="width: 25%;">
					当前价格
				</view>
				<view style="width: 25%;" @click="tipPeg">
					PEG<text class="cuIcon-question text-gray"></text>
				</view>
				<view style="width: 25%;" @click="tipGuzhi">
					估值<text class="cuIcon-question text-gray"></text>
				</view>
			</view>
			<view class="flex text-center py-2 bb" v-for="(item,index) in quoteList" :key="item.symbol">
				<view style="width: 25%;">
					<view>
						{{item.name}}
					</view>
					<view class="text-gray">
						{{item.symbol}}
					</view>
				</view>
				<view style="width: 25%;" class="d-flex justify-center align-items-center">
					{{item.current}}
				</view>
				<view style="width: 25%;" class="d-flex justify-center align-items-center">
					{{item.peg}}
				</view>
				<view style="width: 25%;" class="d-flex justify-center align-items-center" :style="{color:item.peg<1?'green':'red'}">
					{{item.assessment}}
				</view>
			</view>
		</view>
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titles: ['股票代码', '股票名称', '当前价格', 'PEG', '是否低估'],
				quoteList: [],
				pageSize: 1,
				isLoad: false,
			}
		},
		onLoad() {
			this.getData(this.pageSize);
		},
		onReachBottom() {
			if (!this.isLoad) {
				this.nextPage();
			}
		},
		methods: {
			detail(symbol) {
				uni.navigateTo({
					url: `../detail/detail?symbol=${symbol}`
				})
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
			tipPeg(){
				uni.navigateTo({
					url:'../formula/formula'
				})
			},
			tipGuzhi(){
				uni.showModal({
					showCancel:false,
					content:`当：0﹤PEG﹤1，股票价值被低估 PEG=1， 股票价值合理 PEG﹥1， 股票价格被高估`
				})
			},
			async getData(pageSize) {
				// let list = arr.slice(pageSize*15-15,pageSize*15);
				let quoteList = await this.$api.quoteList(pageSize);
				let list = quoteList.list.map((value) => {
					return value.symbol;
				});
				let items = [];
				let promiseQuotes = [];
				let promiseIncomes = [];
				for (let i = 0; i < list.length; i++) {
					let symbol = list[i];
					promiseQuotes.push(this.$api.quote(symbol));
					promiseIncomes.push(this.$api.income(symbol));
				}
				//并发20个请求
				let [quotes, incomes] = await Promise.all([Promise.all(promiseQuotes), Promise.all(promiseIncomes)]);

				for (let i = 0; i < list.length; i++) {
					let item = {};
					item.name = quotes[i].quote.name;
					item.symbol = quotes[i].quote.symbol;
					item.current = quotes[i].quote.current;

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
					let pe_forecast = quotes[i].quote.pe_forecast;
					let pe_lyr = quotes[i].quote.pe_lyr;
					let pe_ttm = quotes[i].quote.pe_ttm;
					if(pe_forecast<0){
						pe_forecast=1000;
					}else if(pe_forecast >500){
						pe_forecast = 500;
					}
					
					if(pe_lyr<0){
						pe_lyr=1000;
					}else if(pe_lyr >500){
						pe_lyr = 500;
					}
					if(pe_ttm<0){
						pe_ttm=1000;
					}else if(pe_ttm >500){
						pe_ttm = 500;
					}
					
					//计算PE(avg)
					let pe_avg = (pe_forecast + pe_lyr + pe_ttm) / 3;
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
						item.assessment = '高估';
					} else if (peg == 1) {
						item.assessment = '合理';
					} else if(peg>0) {
						item.assessment = '低估';
					}else{
						item.assessment = '-';
					}
					item.peg = peg.toFixed(2);
					items.push(item);
				}
				this.quoteList = this.quoteList.concat(items);
			}
		}
	}
</script>

<style>
</style>
