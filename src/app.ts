
import { container, controller, inject } from "./ioc/index"
import TYPES from './TYPEs'
import 'reflect-metadata'
import { IndexService } from "./service/indexService"
import { TestService } from "./service/testService"
container.bind(TYPES.indexService, () => new IndexService())
container.bind(TYPES.testService, () => new TestService())
@controller
class IndexController {
    public indexService: IndexService;
    public testService: TestService;
    constructor(@inject(TYPES.indexService) indexService?: IndexService, @inject(TYPES.testService) testService?: TestService) {
        this.indexService = indexService!
        this.testService = testService!
    }

    info() {
        this.indexService.log("hello world")
        this.testService.log("hello world")
       
    }
}
const index = new IndexController()
index.info()