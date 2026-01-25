package scanner.ex;

import java.util.Scanner;

public class ScannerWhileEx4 {
    public static void main(String[] args) {
        String product;
        int total = 0;

        while (true) {
            Scanner actionScanner = new Scanner(System.in);
            System.out.println("1: 상품 입력, 2: 결제, 3: 프로그램 종료");
            int action = actionScanner.nextInt();

            if (action == 1) {
                Scanner action1 = new Scanner(System.in);
                System.out.print("상품명을 입력하세요: ");
                product = action1.nextLine();
                System.out.print("상품의 가격을 입력하세요: ");
                int price = action1.nextInt();
                System.out.print("구매 수량을 입력하세요: ");
                int amount = action1.nextInt();
                total = total + (price * amount);

                System.out.println("상품명:" + product + " 가격:" + price + " 수량:" + amount + " 합계: " + (price * amount));
            }

            if(action == 2){
                System.out.println("총 비용: " + total);
                total = 0; // 결재 후 총 비용 초기화
            }

            if(action == 3){
                break;
            }
        }


    }
}
