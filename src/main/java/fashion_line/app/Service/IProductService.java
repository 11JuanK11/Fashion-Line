package fashion_line.app.Service;

import java.util.List;
import java.util.Optional;

import fashion_line.app.Entity.Product;

public interface IProductService {
    public Product create(Product product);
    public List<Product> findAll();
    public Optional<Product> findById(Long id)  throws RuntimeException;
    public Optional<Product> findByName(String name)  throws RuntimeException;
    public Optional<List<Product>> findByCategory(String category)  throws RuntimeException;
    public Product update(Product product, Long id)  throws RuntimeException;
    public void delete(Long id) throws RuntimeException;
}
