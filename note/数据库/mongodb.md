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