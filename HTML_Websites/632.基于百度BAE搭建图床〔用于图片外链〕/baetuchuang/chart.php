<?php
require_once 'common.inc.php';
require_once "BaeLog.class.php";
$sql="SELECT COUNT( 0 ) AS cc, FROM_UNIXTIME( created,  '%Y-%m-%d' ) AS dt FROM filestore nolock WHERE 1 =1 AND created >=".strtotime('-6 days')." AND created <= UNIX_TIMESTAMP(NOW()) GROUP BY FROM_UNIXTIME( created,  '%Y-%m-%d' ) ";
$query = $mysql->query($sql);
$rows = array();
while ($obj = $query->fetch_object()) {
    $rows[] = array((strtotime($obj->dt)+8*3600)*1000,intval($obj->cc));
}


$data = json_encode($rows);

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title><?php echo SITENAME;?></title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <script src="/static/js/highcharts.js" type="text/javascript"></script>
        <link rel="stylesheet" href="/static/main_style.css" />
        
        <!--[if lt IE 9]>
          <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        <script type="text/javascript">
     var chart; 
     var dateFormat = '%Y-%m-%d';
     var options = {
         chart: {
             renderTo: 'chatcontainer',
             defaultSeriesType: 'spline',
             events: {
                 
             }
         },
         legend: {
            align: 'left',
            verticalAlign: 'top',
            
            floating: true,
            borderWidth: 0
        },
        global: {
            useUTC: true,
        },
         title: {
             text: '最近7天美图统计'
         },
          tooltip: {  
            formatter: function() {  
                    return Highcharts.dateFormat(dateFormat, this.x)+'<br />美图数:'+Highcharts.numberFormat(this.y,0);  
            }  
        },  
         exporting: {  
            enabled: true
        },  
         xAxis: {
             type: 'datetime',
             dateTimeLabelFormats :{
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m月%d日',
                week: '%m月%d日',
                month: '%b \'%y',
                year: '%Y'
             },
             tickPixelInterval: 100,

         },
         yAxis: {
             minPadding: 0.2,
             maxPadding: 0.2,
             title: {
                 text: '',
                 margin: 10
             }
         },
         plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                           return false;
                        }
                    }
                },
                marker: {
                    lineWidth: 1
                }
            }
        },
         series: [{
             name: '上传美图数',
             data: <?php echo $data;?>
         }]
     };
     $(document).ready(function() {
    	 chart = new Highcharts.Chart(options);
     });
</script>
    </head>
    
    <body>
    <div id="chatcontainer" style="min-width: 400px; height: 400px; margin: 10px auto;border:solid 1px #ccc;"></div>
    </body>
</html>