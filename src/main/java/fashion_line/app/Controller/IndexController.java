package fashion_line.app.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;


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

    @GetMapping("/public/login")
    public String getLoginPage(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "login";    
    }

    @GetMapping("/public/register")
    public String getRegisterPage(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "register";    
    }
}
