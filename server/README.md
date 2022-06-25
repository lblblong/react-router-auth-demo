# 约定

## Token 位置约定

Token 请携带在 `authorization` 请求头中

## 响应约定

正常时返回：

```json
{
  "code": 0,
  "data": ...
}
```

错误时返回：

```json
{
  "code": -1,
  "message": "..."
}
```

## HTTP 状态码约定

- `401`：访问需要登录的接口时未带 token 或 token 失效时返回
