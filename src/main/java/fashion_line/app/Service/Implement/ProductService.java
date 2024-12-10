package fashion_line.app.Service.Implement;

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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public List<Product> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Optional<Product> findByName(String name) throws RuntimeException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByName'");
    }

    @Override
    public Optional<Product> findByCategory(String category) throws RuntimeException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByCategory'");
    }

    @Override
    public Product update(Product product, Long id) throws RuntimeException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Long id) throws RuntimeException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
    
}
