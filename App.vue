<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "common/main.css";
	@import "common/icon.css";
	@import "common/weui.wxss";
	@import "common/bootstrap.wxss";
	@import "common/vant.css";

	.whCenter{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wCenter{
		display: flex;
		justify-content: center;
	}
	.hCenter{
		display: flex;
		align-items: center;
	}
	.hFlex{
		flex-direction: column;
	}
	.wFlex{
		flex-direction: row;
	}
	
	.bb + .bb{
		border-top: 1px solid #b2b2b2;
	}
</style>
