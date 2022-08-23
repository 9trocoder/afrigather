
export default function Skeleton() {
    return (
        <div className="styles.skeleton">
            <div className="styles.s__banner"></div>
            <div className="styles.s__header"></div>
            <div className="styles.s__content"></div>
            <div className="styles.s__content"></div>
            <div className="styles.s__content"></div>

            <style jsx> {`
                .skeleton {
                    max-width: 1200px;
                    margin: 20px auto;
                }

                .skeleton > div {
                    background: #F5F5F5;
                    border-radius: 4px;
                    margin: 20px 0;
                }

                .s__banner {
                    padding: 12% 0;
                }

                .s__header {
                    padding: 15px 0;
                    max-width: 500px;
                }

                .s__content {
                    padding: 8px 0;
                    max-width: 1000px;
                }
            `}</style>
        </div>

        
    )
}
