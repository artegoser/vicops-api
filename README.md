# vicops-api
 api for vicops(virtual countries payment system)

# Example
```javascript
const { vicopsApi } = require("vicops-api");
let user = new vicopsApi("apitest", "**********");

async function test(){
    await user.register();
    let userdata = await user.getUser();
    console.log(userdata);

    await user.transaction("artegoser", 1, "SKL", "Comment");
    let userdata = await user.getUser();
    console.log(userdata.private.transaction);
}
test();
```