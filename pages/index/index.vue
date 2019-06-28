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
		</view>

		<view class="whCenter hFlex pt-5 pb-1" style="color: #ADAEAA;line-height: 44upx;background-color: #F8F8F8;font-size: 24upx;">
			<p>— 数据由A股估值分析团队整理提供 —</p>
			<p>估值数据仅供参考，不构成任何投资建议，投资需谨慎。</p>
		</view>
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	let arr = ["SH600000", "SH600004", "SH600009", "SH600010", "SH600011", "SH600015", "SH600016", "SH600018", "SH600019",
		"SH600023", "SH600025", "SH600027", "SH600028", "SH600029", "SH600030", "SH600031", "SH600036", "SH600038",
		"SH600048", "SH600050", "SH600061", "SH600066", "SH600068", "SH600085", "SH600089", "SH600100", "SH600104",
		"SH600109", "SH600111", "SH600115", "SH600118", "SH600153", "SH600170", "SH600176", "SH600177", "SH600188",
		"SH600196", "SH600208", "SH600219", "SH600221", "SH600233", "SH600271", "SH600276", "SH600297", "SH600299",
		"SH600309", "SH600332", "SH600339", "SH600340", "SH600346", "SH600352", "SH600362", "SH600369", "SH600372",
		"SH600383", "SH600390", "SH600398", "SH600406", "SH600415", "SH600436", "SH600438", "SH600482", "SH600487",
		"SH600489", "SH600498", "SH600516", "SH600519", "SH600522", "SH600535", "SH600547", "SH600566", "SH600570",
		"SH600583", "SH600585", "SH600588", "SH600606", "SH600637", "SH600660", "SH600663", "SH600674", "SH600688",
		"SH600690", "SH600703", "SH600704", "SH600705", "SH600733", "SH600741", "SH600760", "SH600795", "SH600809",
		"SH600816", "SH600837", "SH600867", "SH600886", "SH600887", "SH600893", "SH600900", "SH600919", "SH600926",
		"SH600958", "SH600977", "SH600998", "SH600999", "SH601006", "SH601009", "SH601012", "SH601018", "SH601021",
		"SH601066", "SH601088", "SH601108", "SH601111", "SH601117", "SH601138", "SH601155", "SH601162", "SH601166",
		"SH601169", "SH601186", "SH601198", "SH601211", "SH601212", "SH601216", "SH601225", "SH601228", "SH601229",
		"SH601238", "SH601288", "SH601298", "SH601318", "SH601319", "SH601328", "SH601336", "SH601360", "SH601377",
		"SH601390", "SH601398", "SH601555", "SH601577", "SH601600", "SH601601", "SH601607", "SH601618", "SH601628",
		"SH601633", "SH601668", "SH601669", "SH601688", "SH601727", "SH601766", "SH601788", "SH601800", "SH601808",
		"SH601818", "SH601828", "SH601838", "SH601857", "SH601877", "SH601878", "SH601881", "SH601888", "SH601898",
		"SH601899", "SH601901", "SH601919", "SH601933", "SH601939", "SH601985", "SH601988", "SH601989", "SH601992",
		"SH601997", "SH601998", "SH603019", "SH603156", "SH603160", "SH603259", "SH603260", "SH603288", "SH603799",
		"SH603833", "SH603858", "SH603986", "SH603993", "SZ000001", "SZ000002", "SZ000063", "SZ000069", "SZ000100",
		"SZ000157", "SZ000166", "SZ000333", "SZ000338", "SZ000402", "SZ000408", "SZ000413", "SZ000415", "SZ000423",
		"SZ000425", "SZ000538", "SZ000553", "SZ000568", "SZ000596", "SZ000625", "SZ000627", "SZ000629", "SZ000630",
		"SZ000651", "SZ000656", "SZ000661", "SZ000671", "SZ000703", "SZ000709", "SZ000725", "SZ000728", "SZ000768",
		"SZ000776", "SZ000783", "SZ000786", "SZ000858", "SZ000876", "SZ000895", "SZ000898", "SZ000938", "SZ000961",
		"SZ000963", "SZ001979", "SZ002001", "SZ002007", "SZ002008", "SZ002010", "SZ002024", "SZ002027", "SZ002032",
		"SZ002044", "SZ002050", "SZ002065", "SZ002081", "SZ002120", "SZ002142", "SZ002146", "SZ002153", "SZ002179",
		"SZ002202", "SZ002230", "SZ002236", "SZ002241", "SZ002252", "SZ002271", "SZ002294", "SZ002304", "SZ002310",
		"SZ002311", "SZ002352", "SZ002410", "SZ002411", "SZ002415", "SZ002422", "SZ002456", "SZ002460", "SZ002466",
		"SZ002468", "SZ002475", "SZ002493", "SZ002508", "SZ002555", "SZ002558", "SZ002594", "SZ002601", "SZ002602",
		"SZ002624", "SZ002625", "SZ002673", "SZ002714", "SZ002736", "SZ002739", "SZ002773", "SZ002925", "SZ002938",
		"SZ002939", "SZ002945", "SZ300003", "SZ300015", "SZ300017", "SZ300024", "SZ300033", "SZ300059", "SZ300070",
		"SZ300072", "SZ300122", "SZ300124", "SZ300136", "SZ300142", "SZ300144", "SZ300251", "SZ300296", "SZ300408",
		"SZ300413", "SZ300433", "SZ300498"
	];
	export default {
		data() {
			return {
				titles: ['股票代码', '股票名称', '当前价格', 'PEG', '是否低估'],
				quoteList: [],
				pageSize: 1,
				isLoad:false,
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
			detail(symbol){
				uni.navigateTo({
					url:`../detail/detail?symbol=${symbol}`
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
			async getData(pageSize) {
				let list = arr.slice(pageSize*15-15,pageSize*15);
				// let quoteList = await this.$api.quoteList(pageSize);
				// let list = quoteList.list;
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
						item.assessment = '高估';
					} else if (peg == 1) {
						item.assessment = '合理';
					} else {
						item.assessment = '低估';
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
	.page {
		background-color: #FFF;
	}

	.border-bottom1 {
		border-bottom: 1upx solid #F3F3F3;
	}
</style>
