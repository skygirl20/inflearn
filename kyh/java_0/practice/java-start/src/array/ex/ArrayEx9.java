package array.ex;
import java.util.Scanner;

public class ArrayEx9 {
    public static void main(String[] args) {
        String[] productNames = new String[10];
        int[] productPrices = new int[10];
        int productCount = 0;

        while(true){
            Scanner scanner = new Scanner(System.in);
            System.out.println("1. 상품 등록 | 2. 상품 목록 | 3. 종료");
            System.out.print("메뉴를 선택하세요: ");
            int choice = scanner.nextInt();

            if(choice == 1){
                if(productCount == 10){
                    System.out.println("더 이상 상품을 등록할 수 없습니다.");
                }else{
                    Scanner scanner2 = new Scanner(System.in);
                    System.out.print("상품 이름을 입력하세요:");
                    productNames[productCount] = scanner2.nextLine();
                    System.out.print("상품 가격을 입력하세요:");
                    productPrices[productCount] = scanner2.nextInt();
                    productCount++;
                }
            }else if(choice == 2){
                if(productCount == 0){
                    System.out.println("등록된 상품이 없습니다.");
                }else{
                    for(int i = 0; i < productCount; i++){
                        System.out.println(productNames[i] + ": " + productPrices[i]);
                    }
                }
            }else if(choice == 3){
                System.out.println("종료합니다.");
                break;
            }else{
                System.out.println("잘못된 숫자를 입력하셨습니다.");
            }
        }
    }
}
