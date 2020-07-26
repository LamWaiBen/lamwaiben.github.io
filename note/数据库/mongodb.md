# mongodb

## 框架
- [mongoose](../../framework/mongoose/README.md)

## 性能分析
db.getCollection('player').find({pid:179335}).explain('executionStats')
```
    "executionStats" : {
        "executionSuccess" : true,
        "nReturned" : 1,            // 返回数量
        "executionTimeMillis" : 0,  // 消耗时间(ms)
        "totalKeysExamined" : 1,
        "totalDocsExamined" : 1,    // 扫描的文档数量
        "executionStages" : {
            "stage" : "FETCH",
            "nReturned" : 1,
            "executionTimeMillisEstimate" : 0,
            "works" : 2,
            "advanced" : 1,
            "needTime" : 0,
            "needYield" : 0,
            "saveState" : 0,
            "restoreState" : 0,
            "isEOF" : 1,
            "invalidates" : 0,
            "docsExamined" : 1,
            "alreadyHasObj" : 0,
            "inputStage" : {
                "stage" : "IXSCAN",             // 索引扫描
                "nReturned" : 1,
                "executionTimeMillisEstimate" : 0,
                "works" : 2,
                "advanced" : 1,
                "needTime" : 0,
                "needYield" : 0,
                "saveState" : 0,
                "restoreState" : 0,
                "isEOF" : 1,
                "invalidates" : 0,
                "keyPattern" : {
                    "pid" : 1
                },
                "indexName" : "pid_1",
                "isMultiKey" : false,
                "isUnique" : true,
                "isSparse" : false,
                "isPartial" : false,
                "indexVersion" : 1,
                "direction" : "forward",
                "indexBounds" : {
                    "pid" : [ 
                        "[179335.0, 179335.0]"
                    ]
                },
                "keysExamined" : 1,
                "dupsTested" : 0,
                "dupsDropped" : 0,
                "seenInvalidated" : 0
            }
        }
    },
```


## 主从数据库配置

1. 主节点配置
```
port = 12345
bind_ip = 127.0.0.1
# 主节点
master = true
auth = true
# 主从模式下必须要加keyFile
keyFile = /usr/local/mongodb/db/keyfile
oplogSize = 2048
```

2. 副本集, 从节点
```
port = 12346
auth = true
# 从节点
slave = true               
keyFile = /usr/local/mongodb/db/keyfile
oplogSize = 2048
#副本集名称
replSet = rstest 
```

## 可视化工具
- Robo3T
- [NoSQLBooster](https://nosqlbooster.com/)

### 踩坑
使用工具进行SSH连接时, 会分3步执行:
1. SSH连接到宿主主机  
   如果这一步有问题, 则需要检查私钥的正确性
2. 根据HOST和PORT连接到数据库  
   如果这一步有问题, 请检查宿主主机monogodb开放的端口是否正确,   
   其中 127.0.0.1 只能在本机连接, 0.0.0.0 代表可以被外网访问
3. 根据用户账号密码连接到数据库
   如果这一步有问题, 请检查是否为工具的版本与mongodb的版本不一致, 比如mongodb server 的版本为 4.*.*, 而工具只能连接 3.*.*版本的服务