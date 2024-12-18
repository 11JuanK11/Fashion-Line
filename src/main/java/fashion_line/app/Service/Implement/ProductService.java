package fashion_line.app.Service.Implement;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fashion_line.app.Entity.Product;
import fashion_line.app.Repository.ProductsRepository;
import fashion_line.app.Service.IProductService;

@Service
public class ProductService implements IProductService{

    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public Product create(Product product) {
        if(product == null){
            throw new UnsupportedOperationException("Product information is missing");
        }

        checkExistence(product);
        product.setId(Calendar.getInstance().getTimeInMillis());
        return productsRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return productsRepository.findAll();
    }

    @Override
    public Optional<List<Product>> findByName(String name) throws RuntimeException {
        Optional<List<Product>> productExist = productsRepository.findByName(name);

        if(productExist.isEmpty()){
            throw new UnsupportedOperationException("Product not found by name:" + name);
        } else {
            return productExist;
        }
    }

    @Override
    public Optional<List<Product>> findByCategory(String category) throws RuntimeException {
        Optional<List<Product>> productExist = productsRepository.findByCategory(category);

        if(productExist.isEmpty()){
            throw new UnsupportedOperationException("Products not found by category:" + category);
        } else {
            return productExist;
        }
    }

    @Override
    public Product update(Product product, Long id) throws RuntimeException {
        Optional<Product> productExist = productsRepository.findById(id);

        if(productExist.isEmpty()){
            throw new UnsupportedOperationException("Product not found by id:" + id);
        } else {
            Product productUpdate = productExist.get();

            productUpdate.setName(product.getName());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setSize(product.getSize());
            productUpdate.setCategory(product.getCategory());
            productUpdate.setStock(product.getStock());
            productUpdate.setDescription(product.getDescription());

            return productsRepository.save(productUpdate);
        }
    }

    @Override
    public void delete(Long id) throws RuntimeException {
        
        if(!productsRepository.existsById(id)){
            throw new UnsupportedOperationException("Unimplemented method 'delete'");
        }
        
        productsRepository.deleteById(id);
    }

    
    private void checkExistence(Product product) throws RuntimeException{
        for (Product products: findAll()){
            if(products.getName().equalsIgnoreCase(product.getName()) && products.getSize().equalsIgnoreCase(product.getSize()) 
                && products.getCategory().equalsIgnoreCase(product.getCategory())){
                    
                throw new RuntimeException("Existing product");
            }         
        }
    }

    @Override
    public Optional<Product> findById(Long id) throws RuntimeException {
        Optional<Product> productExist = productsRepository.findById(id);
        if(productExist.isEmpty()){
            throw new UnsupportedOperationException("Product not found by id:" + id);
        } else {
            return productExist;
        }
    }
    
}
