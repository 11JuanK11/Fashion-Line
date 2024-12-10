package fashion_line.app.Controller;

import org.springframework.web.bind.annotation.RestController;

import fashion_line.app.Entity.Product;
import fashion_line.app.Service.IProductService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("/")
    public ResponseEntity<?> getAllProducts() {
        List<Product> allProducts = productService.findAll();
        return ResponseEntity.ok(allProducts);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getProductByName(@PathVariable String name) {
        Optional<Product> productByName = productService.findByName(name);
        return ResponseEntity.ok(productByName);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductByName(@PathVariable Long id) {
        Optional<Product> productById = productService.findById(id);
        return ResponseEntity.ok(productById);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductByCategory(@PathVariable String category) {
        Optional<List<Product>> allProductsByCategory = productService.findByCategory(category);
        return ResponseEntity.ok(allProductsByCategory.get());
    }

    @PostMapping("/")
    public ResponseEntity<?> insertProduct(@RequestBody Product product) {
        try {
            Product newProduct = productService.create(product);
            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "An unexpected error occurred."));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Product product) {
        try {
            Product updatedTreatment = productService.update(product, id);
            return new ResponseEntity<>(updatedTreatment, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while updating the product.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while deleting the product.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    


    


}
