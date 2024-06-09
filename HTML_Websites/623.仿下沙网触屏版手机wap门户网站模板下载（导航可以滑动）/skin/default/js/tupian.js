
            var Class = {
                create: function() {
                    return function() {
                        this.initialize.apply(this, arguments);
                    }
                }
            }
            Object.extend = function(destination, source) {
                for (var property in source) {
                    destination[property] = source[property];
                }
                return destination;
            }
            var TransformView = Class.create();
            TransformView.prototype = {
                //容器对象,滑动对象,切换参数,切换数量
                initialize: function(container, slider, parameter, count, options) {
                    if (parameter <= 0 || count <= 0)
                        return;
                    var oContainer = document.getElementById(container), oSlider = document.getElementById(slider), oThis = this;
                    this.Index = 0;//当前索引
                    this._timer = null;//定时器
                    this._slider = oSlider;//滑动对象
                    this._parameter = parameter;//切换参数
                    this._count = count || 0;//切换数量
                    this._target = 0;//目标参数

                    this.SetOptions(options);

                    this.Up = !!this.options.Up;
                    this.Step = Math.abs(this.options.Step);
                    this.Time = Math.abs(this.options.Time);
                    this.Auto = !!this.options.Auto;
                    this.Pause = Math.abs(this.options.Pause);
                    this.onStart = this.options.onStart;
                    this.onFinish = this.options.onFinish;
                    oContainer.style.overflow = "hidden";
                    oContainer.style.position = "absolute";
                    oSlider.style.position = "absolute";
                    oSlider.style.top = oSlider.style.left = 0;
                },
                //设置默认属性
                SetOptions: function(options) {
                    this.options = {//默认值
                        Up: true, //是否向上(否则向左)
                        Step: 5, //滑动变化率
                        Time: 10, //滑动延时
                        Auto: true, //是否自动转换
                        Pause: 4000, //停顿时间(Auto为true时有效)
                        onStart: function() {
                        }, //开始转换时执行
                        onFinish: function() {
                        }//完成转换时执行
                    };
                    Object.extend(this.options, options || {});
                },
                //开始切换设置
                Start: function() {
                    if (this.Index < 0) {
                        this.Index = this._count - 1;
                    } else if (this.Index >= this._count) {
                        this.Index = 0;
                    }

                    this._target = -1 * this._parameter * this.Index;
                    this.onStart();
                    this.Move();
                },
                //移动
                Move: function() {
                    clearTimeout(this._timer);
                    var oThis = this, style = this.Up ? "top" : "left", iNow = parseInt(this._slider.style[style]) || 0, iStep = this.GetStep(this._target, iNow);

                    if (iStep != 0) {
                        this._slider.style[style] = (iNow + iStep) + "px";
                        this._timer = setTimeout(function() {
                            oThis.Move();
                        }, this.Time);
                    } else {
                        this._slider.style[style] = this._target + "px";
                        this.onFinish();
                        if (this.Auto) {
                            this._timer = setTimeout(function() {
                                oThis.Index++;
                                oThis.Start();
                            }, this.Pause);
                        }
                    }
                },
                //获取步长
                GetStep: function(iTarget, iNow) {
                    var iStep = (iTarget - iNow) / this.Step;
                    if (iStep == 0)
                        return 0;
                    if (Math.abs(iStep) < 1)
                        return (iStep > 0 ? 1 : -1);
                    return iStep;
                },
            };