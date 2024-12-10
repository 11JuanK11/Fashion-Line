package fashion_line.app.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class IndexController {

    @GetMapping("/")
    public String getIndexPage() {
        return "index";
    }

    @GetMapping("/edit")
    public String getEditProductsPage() {
        return "editProduct";
    }
    
    @GetMapping("/add")
    public String getAddProductsPage() {
        return "addProduct";
    }
}
