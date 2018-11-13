# debug
    1). 调试的目的
         1). 查找bug: 不断缩小可疑代码的范围
         2). 查看程序的运行流程(用于熟悉新接手项目的代码)
       
    2). 如何开启调试模式
         1). 添加语debugger句: 程序运行前     此方式用打包后才运行的项目
         2). 添加(打)断点: 程序运行前或者过程中   此方式用运行源码js
       
    3). 如何进行调试操作
         resume: 恢复程序执行(可能执行完或者进入下一个断点处)
         step ove: 单步跳转, 尝试执行完当前语句, 进入下一条(如果内部有断点, 自动进入内部断点处)
         step into: 跳入, 进入当前调用函数内部
         step out: 跳出, 一次性执行完当前函数后面所有语句,并出去
         deactivate breakpoints: 使所有断点暂时失效
         
         call stack: 显示是程序函数调用的过程
         scop: 当前执行环境对应的作用域中包含的变量数据
         breakpoints: 断点列表