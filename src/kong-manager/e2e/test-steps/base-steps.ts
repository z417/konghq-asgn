export interface BaseSteps {
  login?: () => Promise<void>;
}
/**
//Gateway Service "new-services" successfully created!

const verifyToaster = async (options: {
  type: 'success' | 'error' | 'warning'| 'info',
  message?: string,
  timeout?: number,
}): Promise<ToasterAssertions> {
    const { type, message } = options;
    
    // 1. 等待 toaster 出现
    await expect(this.$toasterContainer).toBeVisible();
    await expect(this.$currentToaster).toBeVisible();
    
    // 2. 验证类型
    await expect(this.$currentToaster).toHaveClass(new RegExp(`toaster ${type}`));
    
    // 3. 如果有消息，验证消息
    if (message) {
      await expect(this.$toasterMessage).toHaveText(message);
    }
    
    return new ToasterAssertions(this);
  }

  /**
   * 等待 toaster 消失
   * @param timeout 超时时间
  async waitForToasterToDisappear(timeout: number = 5000): Promise<void> {
    await expect(this.$toasterContainer).not.toBeVisible({ timeout });
  }
}
*/
