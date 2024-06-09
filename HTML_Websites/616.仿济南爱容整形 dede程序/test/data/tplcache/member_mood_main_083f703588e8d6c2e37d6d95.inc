<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>">
<title>会员心情管理</title>
<link href="css/base.css" rel="stylesheet" type="text/css">
<script language="javascript">
//获得选中文件的文件名
function getCheckboxItem(){
	 var allSel="";
	 if(document.form1.logs.value) return document.form1.logs.value;
	 for(i=0;i<document.form1.logs.length;i++)
	 {
		 if(document.form1.logs[i].checked){
			 if(allSel=="")
				 allSel=document.form1.logs[i].value;
			 else
				 allSel=allSel+"`"+document.form1.logs[i].value;
		 }
	 }
	 return allSel;	
}

function ReSel(){
	for(i=0;i<document.form1.logs.length;i++){
		if(document.form1.logs[i].checked) document.form1.logs[i].checked = false;
		else document.form1.logs[i].checked = true;
	}
}

function DelSel(){
	 var nid = getCheckboxItem();
	 if(nid==""){
		  alert("请选择项目!\r\n");
		  return ;
	 }
	 location.href = "member_msg_edit.php?dopost=del&ids="+nid;
}

function CheckSel(){
	 var nid = getCheckboxItem();
	 if(nid==""){
		  alert("请选择项目!\r\n");
		  return ;
	 }
	 location.href = "member_msg_edit.php?dopost=check&ids="+nid;
}
</script>
<style type="text/css">
.current {border:1px solid #98CAEF;padding:5px;background:#FFFEF4;color:#FF0000;}
</style>
</head>
<body background="images/allbg.gif" leftmargin='8' topmargin='8'>
<table width="98%" border="0" cellpadding="2" cellspacing="1" bgcolor="#D6D6D6" align="center">
  <tr>
    <td height="28" colspan="4" background='images/tbg.gif'><table width="96%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="20%" height="18" style="padding-left:10px;"><strong>会员心情管理：</strong></td>
        <td width="80%" align="right"><table width="88%" border="0" cellspacing="0" cellpadding="0">
      <form name='formsearch'>
      <input type="hidden" value="<?php echo $ischeck;?>" name="ischeck">
      <input type="hidden" value="mood" name="type">
        <tr>
          <td height="21" align="right"> 时间：
            <select name="dtime">
              <option value="0" selected>--全部--</option>
              <option value="1">今天</option>
              <option value="7">一周内</option>
              <option value="15">15天内</option>
              <option value="30">30天以内</option>
              <option value="60">60天以内</option>
              </select>
            &nbsp;
            <input type="submit" name="Submit" value="搜索" /></td>
          </tr>
        </form>
    </table></td>
      </tr>
    </table></td>
  </tr>
  <tr align="center" bgcolor="#ffffff">
    <td height="32" colspan="4" align="left" bgcolor="#FAFAF1"><span <?php if(empty($ischeck)) echo "class='current'";?>><a href='member_info_main.php?type=mood'>全部(<?php echo $totalnum;?>)</a></span> | <span <?php if($ischeck=='1') echo "class='current'";?>><a href='member_info_main.php?type=mood&ischeck=1'>已审核(<?php echo $checknum;?>)</a></span>| <span <?php if($ischeck=='-1') echo "class='current'";?>><a href='member_info_main.php?type=mood&ischeck=-1'>未审核(<?php echo $ischecknum;?>)</a></span></td>
  </tr>
  <tr align="center" height="26" bgcolor="#FBFCE2">
    <td width="8%">选择</td>
    <td width="11%">ID</td>
    <td>内容</td>
    <td width="15%">时间</td>
  </tr>
  <form name="form1">
    <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
    <tr align="center" bgcolor="#FFFFFF" height="26" align="center" onMouseMove="javascript:this.bgColor='#FCFDEE';" onMouseOut="javascript:this.bgColor='#FFFFFF';">
      <td><input name='logs' type='checkbox' class='np' id="logs" value='<?php echo $fields['id']; ?>' /></td>
      <td width="11%"><?php echo $fields['id']; ?> </td>
      <td align="left"><?php echo jstrimjajxlog($fields['msg'],200); ?> [<?php echo IsChecklog($fields['ischeck']); ?>](<a href='member_info_main.php?type=mood&dopost=pall&mid=<?php echo $fields['mid']; ?>'><?php echo $fields['userid']; ?></a>)</td>
      <td> <?php echo floorTime(time()-$fields['dtime'],$fields['dtime']); ?> </td>
    </tr>
    <?php
}
}?>
  </form>
  <tr>
    <td height="30" colspan="4" bgcolor="#ffffff">&nbsp;
      <input type="button" name="b5" value="反选"  style="width:40px" class="coolbg np" onClick="ReSel();" />
      &nbsp;
      <input type="button" name="b5" value="审核"  style="width:40px" class="coolbg np" onClick="CheckSel();" />
      &nbsp;
      <input type="button" name="b6" value="删除所选"  style="width:80px" class="coolbg np" onClick="DelSel();" />
       </td>
  </tr>
  <tr bgcolor="#E3F7D2">
    <td height="24" colspan="4" align="center" bgcolor="#F9FCEF"> <?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '5';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
 </td>
  </tr>
</table>
</body>
</html>